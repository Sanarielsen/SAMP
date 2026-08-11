import { prisma } from "@/lib/prisma";

import { ImportedProcessRepository } from "@/repositories/imported-process-repository";

import { 
  ImportedProcess,
  ImportedProcessCreateDTO,
  ImportedProcessUpdateDTO,
  ImportedProcessWithDetails
} from "@shared/types/importedProcess";
import { OptionsControlledBox } from "@shared/types/values";


export class PrismaImportedProcessRepository implements ImportedProcessRepository {
  create(data: ImportedProcessCreateDTO): Promise<ImportedProcess> {
    return prisma.importedProcess.create({
      data: {
        clientId: data.clientId,
        processNumber: data.processNumber,
        processStatus: data.processStatus,
        processMagazine: data.processMagazine,
        holder: data.holder,
        brand: data.brand,
        nature: data.nature,
        presentation: data.presentation,
        niceTitle: data.niceTitle,
        niceStatus: data.niceStatus,
        niceSpecification: data.niceSpecification,
        filingDate: data.filingDate,
        grantDate: data.grantDate,
        expirationDate: data.expirationDate,
        createdByUser: data.userIdLogged,
        updatedByUser: data.userIdLogged
      }
    })
  }

  async update(data: ImportedProcessUpdateDTO): Promise<ImportedProcess> {
    return prisma.importedProcess.update({
      where: {
        id: data.id,
      },
      data: {
        clientId: data.clientId,
        processNumber: data.processNumber,
        processStatus: data.processStatus,
        processMagazine: data.processMagazine, 
        holder: data.holder,
        brand: data.brand,
        nature: data.nature,
        presentation: data.presentation,
        niceTitle: data.niceTitle,
        niceStatus: data.niceStatus,
        niceSpecification: data.niceSpecification,
        filingDate: data.filingDate,
        grantDate: data.grantDate,
        expirationDate: data.expirationDate,
        createdByUser: data.userIdLogged,
        updatedByUser: data.userIdLogged,
      }
    })
  }

  async restore( id: string, data: ImportedProcessCreateDTO ): Promise<ImportedProcess> {
    return prisma.importedProcess.update({
      where: {
        id,
      },
      data: {
        clientId: data.clientId,
        processNumber: data.processNumber,
        processStatus: data.processStatus,
        processMagazine: data.processMagazine, 
        holder: data.holder,
        brand: data.brand,
        nature: data.nature,
        presentation: data.presentation,
        niceTitle: data.niceTitle,
        niceStatus: data.niceStatus,
        niceSpecification: data.niceSpecification,
        filingDate: data.filingDate,
        grantDate: data.grantDate,
        expirationDate: data.expirationDate,
        createdByUser: data.userIdLogged,
        updatedByUser: data.userIdLogged,
        deletedAt: null,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.importedProcess.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(Date.now())
      }
    })
  }

  async findById(id: string): Promise<ImportedProcess | null> {
    const importedProcess = prisma.importedProcess.findUnique({
      where: {
        id,
      },
    })

    if (!importedProcess) {
      return null
    }

    return importedProcess
  }
  
  async findByProcessNumber(processNumber: string): Promise<ImportedProcess | null> {
    return await prisma.importedProcess.findFirst({
      where: {
        processNumber
      }
    })
  }

  async findManyDetailsWithSearch(search: string): Promise<ImportedProcessWithDetails[] | null> {
    const importedProcesses = await prisma.importedProcess.findMany({
      where: {
        deletedAt: null,
        OR: [
          { processNumber: { contains: search, mode: 'insensitive' }},
          { holder: { contains: search, mode: 'insensitive' }},
          { brand: { contains: search, mode: 'insensitive' }},
          { nature: { contains: search, mode: 'insensitive' }},
          { presentation: { contains: search, mode: 'insensitive' }},
          { niceTitle: { contains: search, mode: 'insensitive' }},
          { niceStatus: { contains: search, mode: 'insensitive' }},
          { niceSpecification: { contains: search, mode: 'insensitive' }},
          { processMagazine: { contains: search, mode: 'insensitive' }},
          { client: { legalName: { contains: search, mode: 'insensitive' } } },
          { client: { tradeName: { contains: search, mode: 'insensitive' } } },
          { client: { protocol: { contains: search, mode: 'insensitive' } } },
          { createdByUserId: { name: { contains: search, mode: 'insensitive' } } },
          { createdByUserId: { email: { contains: search, mode: 'insensitive' } } },
          { updatedByUserId: { name: { contains: search, mode: 'insensitive' } } },
          { updatedByUserId: { email: { contains: search, mode: 'insensitive' } } },
        ]
      },
      include: {
        client: true,
        createdByUserId: {
          include: {
            userRole: true,
          }
        },
        updatedByUserId: true,
      },
      take: 100,
    })

    return importedProcesses.map((process) => ({
      id: process.id,

      clientId: process.clientId,
      clientName: process.client.legalName,
      clientLegalName: process.client.legalName,
      clientTradeName: process.client.tradeName,
      clientTypeName: String(process.client.type),
      clientDocument: process.client.protocol,

      processNumber: process.processNumber,
      processMagazine: process.processMagazine,
      processStatus: process.processStatus,
      holder: process.holder,
      brand: process.brand,
      nature: process.nature,
      presentation: process.presentation,
      niceTitle: process.niceTitle,
      niceStatus: process.niceStatus,
      niceSpecification: process.niceSpecification,

      filingDate: process.filingDate,
      grantDate: process.grantDate,
      expirationDate: process.expirationDate,

      createdByUser: process.createdByUser,
      updatedByUser: process.updatedByUser,
      userName: process.createdByUserId?.name ?? process.updatedByUserId?.name ?? '',
      userRoleName: process.createdByUserId?.userRole?.name ?? '',
      userEmail: process.createdByUserId?.email ?? process.updatedByUserId?.email ?? '',

      createdAt: process.createdAt,
      updatedAt: process.updatedAt,
      deletedAt: process.deletedAt,
    }))
  }

  async findManyByProcessHistoricIdAsAOption(processHistoricId: string, search?: string): Promise<OptionsControlledBox[]> {
    throw new Error('Method need to be reviewed')
    // const whereClause: any = {
    //   processHistoricId
    // }

    // if (search && search.trim().length > 0) {
    //   const q = search.trim()
    //   whereClause.AND = [
    //     {
    //       OR: [
    //         { processNumber: { contains: q, mode: 'insensitive' } },
    //         { holder: { contains: q, mode: 'insensitive' } },
    //         { processType: { name: { contains: q, mode: 'insensitive' } } },
    //       ],
    //     },
    //   ]
    // }

    // const importedProcesses = await prisma.importedProcess.findMany({
    //   where: whereClause,
    //   include: {
    //     processType: true
    //   },
    //   take: 10,
    // })

    // return importedProcesses.map(currentProcess => ({
    //   label: `${currentProcess.processNumber} - ${currentProcess.holder} - ${currentProcess.processType?.name}`,
    //   value: currentProcess.id,
    // }));
  }
}