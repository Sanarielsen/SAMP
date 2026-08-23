import { prisma } from "@/lib/prisma";

import { ProcessPublicationRepository } from "@/repositories/process-publication";
import { parseStringDateToBrazilianDate } from "@/utils/parseStringDateToBrazilianDate"

import { 
  ProcessPublication,
  ProcessPublicationCreateDTO,
  ProcessPublicationCreateFromINPIDTO,
  ProcessPublicationDetails,
  ProcessPublicationUpdateDTO, 
} from "@shared/types/processPublication";


export class PrismaProcessPublicationRepository implements ProcessPublicationRepository {
  async create(data: ProcessPublicationCreateDTO): Promise<ProcessPublication> {
    throw new Error("Method not implemented.");
  }

  async createMany(data: ProcessPublicationCreateFromINPIDTO): Promise<number> {
    
    const incoming = data.publications.map(publication => ({
      ...publication,
      importedProcessId: data.importedProcessId,
      publicationDate: parseStringDateToBrazilianDate(publication.publicationDate),
      createdByUser: data.createdByUser,
      updatedByUser: data.createdByUser,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    }))

    const existing = await prisma.processPublication.findMany({
      where: { importedProcessId: data.importedProcessId },
    })

    const toCreate: typeof incoming = []
    const toRestoreIds: string[] = []

    const normalize = (value: any) => {
      if (value == null) return ""
      return String(value)
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase()
    }

    const equals = (a: any, b: any) => {
      if (normalize(a.magazineNumber) !== normalize(b.magazineNumber)) return false
      if (normalize(a.dispatch) !== normalize(b.dispatch)) return false
      if (normalize(a.certificate ?? null) !== normalize(b.certificate ?? null)) return false
      if (normalize(a.description ?? null) !== normalize(b.description ?? null)) return false
      if (normalize(a.complement ?? null) !== normalize(b.complement ?? null)) return false

      const aDate = new Date(a.publicationDate)
      const bDate = new Date(b.publicationDate)
      aDate.setHours(0, 0, 0, 0)
      bDate.setHours(0, 0, 0, 0)
      return aDate.getTime() === bDate.getTime()
    }

    for (const inc of incoming) {
      const match = existing.find(e => equals(e, inc))
      if (!match) {
        toCreate.push(inc)
      } else {
        if (match.deletedAt) {
          toRestoreIds.push(match.id)
        }
      }
    }

    const txOperations: any[] = []

    if (toCreate.length > 0) {
      txOperations.push(
        prisma.processPublication.createMany({
          data: toCreate.map(p => ({
            importedProcessId: p.importedProcessId,
            magazineNumber: p.magazineNumber,
            publicationDate: p.publicationDate,
            dispatch: p.dispatch,
            certificate: p.certificate,
            description: p.description,
            complement: p.complement,
            createdByUser: p.createdByUser,
            updatedByUser: p.updatedByUser,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
            deletedAt: p.deletedAt,
          })),
        })
      )
    }

    for (const id of toRestoreIds) {
      txOperations.push(
        prisma.processPublication.update({
          where: { id },
          data: {
            deletedAt: null,
            updatedAt: new Date(),
            updatedByUser: data.createdByUser,
          },
        })
      )
    }

    if (txOperations.length === 0) return 0

    const results = await prisma.$transaction(txOperations)

    let createdCount = 0
    if (toCreate.length > 0) {
      const createResult = results[0]
      createdCount = typeof createResult === "object" && createResult !== null && "count" in createResult ? (createResult as any).count : toCreate.length
    }

    const restoredCount = toRestoreIds.length

    return createdCount + restoredCount
  }

  async update(data: Partial<ProcessPublicationUpdateDTO>): Promise<ProcessPublication> {
    return prisma.processPublication.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.processPublication.update({
      where: {
        id
      },
      data: {
        deletedAt: new Date(Date.now())
      },
    })
  }

  async findById(id: string): Promise<ProcessPublication | null> {
    return await prisma.processPublication.findUnique({
      where: {
        id,
      },
    })
  }

  async findByIdDetails(id: string): Promise<ProcessPublicationDetails | null> {
    const processPublicationWithDetails = await prisma.processPublication.findUnique({
      where: {
        id,
      },
      include: {
        importedProcess: true,
        createdByUserId: true,
        updatedByUserId: true
      }
    })

    if (!processPublicationWithDetails) return null

    return {
      id: processPublicationWithDetails.id,

      importedProcessId:  processPublicationWithDetails.importedProcessId,
      processHolder:      processPublicationWithDetails.importedProcess.holder,
      processBrand:       processPublicationWithDetails.importedProcess.brand,

      magazineNumber:   processPublicationWithDetails.magazineNumber,
      publicationDate:  processPublicationWithDetails.publicationDate,
      dispatch:         processPublicationWithDetails.dispatch,
      certificate:      processPublicationWithDetails.certificate,
      description:      processPublicationWithDetails.description,
      complement:       processPublicationWithDetails.complement,

      createdByUser:  processPublicationWithDetails.createdByUser,
      updatedByUser:  processPublicationWithDetails.updatedByUser,
      createdBy:      processPublicationWithDetails.createdByUserId.name,
      updatedBy:      processPublicationWithDetails.updatedByUserId.name,
    
      createdAt: processPublicationWithDetails.createdAt,
      updatedAt: processPublicationWithDetails.updatedAt,
      deletedAt: processPublicationWithDetails.deletedAt,
    }
  }

  async findManyByProcessId(processId: string): Promise<ProcessPublication[]> {
    return await prisma.processPublication.findMany({
      where: {
        importedProcessId: processId,
        deletedAt: null
      },
    })
  }

  async findManyByProcessFromINPI(processNumber: string): Promise<ProcessPublication[]> {
    throw new Error("Method not implemented.");
  }
}