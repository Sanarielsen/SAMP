import { prisma } from "@/lib/prisma";

import { ProcessImportedRepository } from "@/repositories/process-imported-repository";

import { 
  CreatedProcessImportedDTO, 
  DetailsProcessImportedDTO,
  ProcessImported
} from "@shared/types/processImported";
import { OptionsControlledBox } from "@shared/types/values";


export class PrismaProcessImportedRepository implements ProcessImportedRepository {
  async createManyAsImport(importedProcesses: CreatedProcessImportedDTO[]): Promise<number> {
    const chunkSize = 500
    let totalCount = 0

    for (let i = 0; i < importedProcesses.length; i += chunkSize) {
      const chunk = importedProcesses.slice(i, i + chunkSize)
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

  async findById(id: string): Promise<ProcessImported | null> {
    return await prisma.importedProcess.findUnique({
      where: {
        id
      }
    })
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

  async findManyByProcessHistoricIdAsAOption(processHistoricId: string, search?: string): Promise<OptionsControlledBox[]> {
    const whereClause: any = {
      processHistoricId
    }

    if (search && search.trim().length > 0) {
      const q = search.trim()
      whereClause.AND = [
        {
          OR: [
            { processNumber: { contains: q, mode: 'insensitive' } },
            { holder: { contains: q, mode: 'insensitive' } },
            { processType: { name: { contains: q, mode: 'insensitive' } } },
          ],
        },
      ]
    }

    const importedProcesses = await prisma.importedProcess.findMany({
      where: whereClause,
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