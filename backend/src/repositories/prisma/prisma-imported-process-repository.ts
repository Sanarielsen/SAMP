import { prisma } from "@/lib/prisma";

import { ImportedProcessRepository } from "@/repositories/process-imported-repository";

import { 
  CreatedProcessImportedDTO, 
  DetailsProcessImportedDTO,
  ImportedProcess,
  ImportedProcessFilter,
  ImportedProcessListWithDetails
} from "@shared/types/processImported";
import { OptionsControlledBox } from "@shared/types/values";


export class PrismaProcessImportedRepository implements ImportedProcessRepository {
  create(data: CreatedProcessImportedDTO): Promise<ImportedProcess> {
    throw new Error("Method not implemented.");
  }
  
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

  //TODO: Refine the data returned;
  async findManyByFilterWithSearch(search: string, filter: ImportedProcessFilter): Promise<ImportedProcessListWithDetails[]> {
    const importedProcesses = await prisma.importedProcess.findMany({
      where: {
        AND: [{
          processCategoryId: filter.categoryId,
          processTypeId: filter.typeId,
          processHistoricId: filter.historyId
        }],
        OR: [
          { processNumber: { contains: search, mode: 'insensitive' }},
          { holder: { contains: search, mode: 'insensitive' }},
          { dispatchDetails: { contains: search, mode: 'insensitive' }},
          { attorney: { contains: search, mode: 'insensitive' }},
          { presentation: { contains: search, mode: 'insensitive' }},
          { nature: { contains: search, mode: 'insensitive' }},
          { markName: { contains: search, mode: 'insensitive' }},
          { ncl: { contains: search, mode: 'insensitive' }},
          { specification: { contains: search, mode: 'insensitive' }},
          { translatedSpecification: { contains: search, mode: 'insensitive' }},
          { internationalRegistrationNumber: { contains: search, mode: 'insensitive' }},
          { cfe: { contains: search, mode: 'insensitive' }},
        ]
      },
      include: {
        processHistoric: true,
        processCategory: true,
        processType: true
      },
      take: 100,
    })
    
    return importedProcesses.map((process) => ({
      id: process.id,
      processHistoricId: process.processHistoricId,
      processCategoryId: process.processCategoryId,
      processTypeId: process.processTypeId,

      processNumber: process.processNumber,
      holder: process.holder,
      dispatchDetails: process.dispatchDetails,
      attorney: process.attorney,
      presentation: process.presentation,
      nature: process.nature,
      markName: process.markName,
      ncl: process.ncl,
      specification: process.specification,
      translatedSpecification: process.translatedSpecification,
      internationalRegistrationNumber: process.internationalRegistrationNumber,
      cfe: process.cfe,

      status: process.status,
      sourceText: process.sourceText,
      sourcePage: process.sourcePage,
      importedByUser: process.importedByUser,
      depositDate: process.depositDate,
      receivedDate: process.receivedDate,
      grantDate: process.grantDate,
      createdAt: process.createdAt,

      categoryName: process.processCategory.name,
      typeName: process.processType!.name,
      magazineNumber: process.processHistoric.numberMagazine,
    }));
  }

  async findById(id: string): Promise<ImportedProcess | null> {
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

  async deleteManyByProcessHistoricId(processHistoricId: string): Promise<void> {
    await prisma.importedProcess.deleteMany({
      where: {
        processHistoricId
      }
    })
  }
}