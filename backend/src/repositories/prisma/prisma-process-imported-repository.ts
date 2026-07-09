import { prisma } from "@/lib/prisma";

import { ProcessImportedRepository } from "@/repositories/process-imported-repository";

import { 
  CreatedProcessImportedDTO, 
  DetailsProcessImportedDTO
} from "@shared/types/processImported";
import { OptionsControlledBox } from "@shared/types/values";


export class PrismaProcessImportedRepository implements ProcessImportedRepository {
  async createManyAsImport(importedProcesses: CreatedProcessImportedDTO[]): Promise<number> {
    const { count } = await prisma.importedProcess.createMany({
      data: importedProcesses.map(process => ({
        ...process,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      })),
      skipDuplicates: true,
    })
    
    return count;
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
      title: importedProcess.title,
      titular: importedProcess.titular,
      createdAt: importedProcess.createdAt,
      processNumber: importedProcess.processNumber,
      processTypeId: importedProcess.processTypeId,
      processTypeName: importedProcess.processType?.name
    }
  }

  async findManyByProcessHistoricIdAsAOption(processHistoricId: string): Promise<OptionsControlledBox[]> {
    const importedProcesses = await prisma.importedProcess.findMany({
      where: {
        processHistoricId
      },
      take: 10,
    })

    return importedProcesses.map(currentProcess => ({
      label: `${currentProcess.processNumber} - ${currentProcess.title} - ${currentProcess.titular}`,
      value: currentProcess.id,
    }));
  }
}