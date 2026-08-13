import { prisma } from "@/lib/prisma";

import { ProcessPublicationRepository } from "@/repositories/process-publication-repository";
import { parseStringDateToBrazilianDate } from "@/utils/parseStringDateToBrazilianDate"

import { 
  ProcessPublication,
  ProcessPublicationCreateDTO,
  ProcessPublicationCreateFromINPIDTO, 
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

  findManyByProcessFromINPI(processNumber: string): Promise<ProcessPublication[]> {
    throw new Error("Method not implemented.");
  }
}