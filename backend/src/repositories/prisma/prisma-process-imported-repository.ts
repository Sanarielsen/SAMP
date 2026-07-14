import { prisma } from "@/lib/prisma";

import { ProcessImportedRepository } from "@/repositories/process-imported-repository";

import { 
  CreatedProcessImportedDTO, 
  DetailsProcessImportedDTO
} from "@shared/types/processImported";
import { OptionsControlledBox } from "@shared/types/values";


export class PrismaProcessImportedRepository implements ProcessImportedRepository {
  async createManyAsImport(importedProcesses: CreatedProcessImportedDTO[]): Promise<number> {
    const chunkSize = 500
    let totalCount = 0

    for (let i = 0; i < importedProcesses.length; i += chunkSize) {
      const chunk = importedProcesses.slice(i, i + chunkSize)
      console.log("Registro: ", i)
      const { count } = await prisma.importedProcess.createMany({
        data: chunk.map(process => ({
          ...process,
          createdAt: new Date()
        })),
        skipDuplicates: true,
      })

      totalCount += count
    }
    
    return totalCount;
  }

  async findByIdDetails(id: string): Promise<DetailsProcessImportedDTO | null> {
    const importedProcess = await prisma.importedProcess.findUnique({
      where: {
        id
      },
      include: {
        processType: true
      }
    })

    if (!importedProcess) {
      return null
    }

    return {
      id: importedProcess.id,
      holder: importedProcess.holder,
      createdAt: importedProcess.createdAt,
      processNumber: importedProcess.processNumber,
      processTypeId: importedProcess.processTypeId,
      processTypeName: importedProcess.processType!.name
    }
  }

  async findManyByProcessHistoricIdAsAOption(processHistoricId: string): Promise<OptionsControlledBox[]> {
    const importedProcesses = await prisma.importedProcess.findMany({
      where: {
        processHistoricId
      },
      include: {
        processType: true
      },
      take: 10,
    })

    return importedProcesses.map(currentProcess => ({
      label: `${currentProcess.processNumber} - ${currentProcess.holder} - ${currentProcess.processType?.name}`,
      value: currentProcess.id,
    }));
  }
}