import { prisma } from "@/lib/prisma";

import { PublicationRepository } from "@/repositories/publication-repository";

import { 
  Publication,
  CreatePublicationDTO,
  PublicationDetails, 
} from "@shared/types/publication";


export class PrismaPublicationRepository implements PublicationRepository {
  create(data: CreatePublicationDTO): Promise<Publication> {
    throw new Error("Method not implemented.");
  }
  async createTransferImportedProcess(data: CreatePublicationDTO): Promise<Publication> {
    return await prisma.publication.create({
      data
    })
  }

  async findManySearchByUserId(userId: string, search?: string): Promise<PublicationDetails[] | null> {
    const publications = await prisma.publication.findMany({
      where: {
        client: {
          responsibleById: userId,
        },

        ...(search && {
          processNumber: {
            contains: search,
            mode: "insensitive",
          },
        }),
      },

      include: {
        client: true,
        processType: true,
        processHistoric: true,
      },
    })

    return publications.map((publication) => ({
      id: publication.id,
      processHistoryId: publication.processHistoryId,
      processHistoryMagazine: publication.processHistoric.numberMagazine,
      processTypeId: publication.processTypeId,
      processTypeName: publication.processType!.name,
      processTypeSlug: publication.processType!.slug,
      clientId: publication.client.id,
      clientName: publication.client.tradeName,
      clientProtocol: publication.client.protocol,
      processNumber: publication.processNumber,
      holder: publication.holder,
      brand: publication.brand,
      nature: publication.nature,
      specification: publication.specification,
      publicationDate: publication.publicationDate, 
      depositDate: publication.depositDate, 
      grantDate: publication.grantDate, 
      createdAt: publication.createdAt,
      updatedAt: publication.createdAt,
      deletedAt: publication.deletedAt
    }))
  }
}