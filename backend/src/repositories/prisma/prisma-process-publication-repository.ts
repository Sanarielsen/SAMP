import { prisma } from "@/lib/prisma";

import { ProcessPublicationRepository } from "@/repositories/process-publication-repository";
import { parseStringDateToBrazilianDate } from "@/utils/parseStringDateToBrazilianDate"

import { 
  ProcessPublication,
  ProcessPublicationCreateDTO,
  ProcessPublicationCreateFromINPIDTO,
  ProcessPublicationUpdateDTO, 
} from "@shared/types/processPublication";


export class PrismaProcessPublicationRepository implements ProcessPublicationRepository {
  
  create(data: ProcessPublicationCreateDTO): Promise<ProcessPublication> {
    throw new Error("Method not implemented.");
  }

  async createMany(data: ProcessPublicationCreateFromINPIDTO): Promise<number> {
    const { count } = await prisma.processPublication.createMany({
      data: data.publications.map(publication => ({
        ...publication,
        importedProcessId: data.importedProcessId,
        publicationDate: parseStringDateToBrazilianDate(publication.publicationDate),
        createdByUser: data.createdByUser,
        updatedByUser: data.createdByUser,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      })),
      skipDuplicates: true,
    })

    return count
  }

  async update(data: Partial<ProcessPublicationUpdateDTO>): Promise<ProcessPublication> {
    return prisma.processPublication.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async findById(id: string): Promise<ProcessPublication | null> {
    return await prisma.processPublication.findUnique({
      where: {
        id,
      },
    })
  }

  async findManyByProcessId(processId: string): Promise<ProcessPublication[]> {
    return await prisma.processPublication.findMany({
      where: {
        importedProcessId: processId
      },
    })
  }

  async findManyByProcessFromINPI(processNumber: string): Promise<ProcessPublication[]> {
    throw new Error("Method not implemented.");
  }
}