import { prisma } from "@/lib/prisma";

import { PublicationRepository } from "@/repositories/publication-repository";

import { 
  Publication,
  CreatePublicationDTO,
  PublicationDetails,
  UpdatePublicationDTO, 
} from "@shared/types/publication";


export class PrismaPublicationRepository implements PublicationRepository {
  async create(data: CreatePublicationDTO): Promise<Publication> {
    return await prisma.publication.create({
      data
    })
  }

  async createTransferImportedProcess(data: CreatePublicationDTO): Promise<Publication> {
    return await prisma.publication.create({
      data
    })
  }

  async update(data: UpdatePublicationDTO): Promise<Publication> {
    return await prisma.publication.update({
      where: {
        id: data.id
      },
      data
    })
  }

  async findById(id: string): Promise<Publication | null> {
    return await prisma.publication.findUnique({
      where: {
        id
      }
    })
  }

  async findByProcessNumber(processNumber: string): Promise<Publication | null> {
    return await prisma.publication.findUnique({
      where: {
        processNumber
      }
    })
  }

  async findManySearchByUserId(userId: string, search?: string): Promise<PublicationDetails[] | null> {
    const publications = await prisma.publication.findMany({
      where: {
        client: {
          responsibleById: userId,
        },

        ...(search && {
          AND: [
            {
              OR: [
                {
                  processNumber: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  holder: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  brand: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  nature: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  specification: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  client: {
                    tradeName: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                },
                {
                  client: {
                    protocol: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                },
                {
                  processType: {
                    name: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                },
                {
                  processType: {
                    slug: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                },
              ],
            },
          ],
        }),
      },

      include: {
        client: true,
        processType: true
      },
    })

    return publications.map((publication) => ({
      id: publication.id,
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
      presentation: publication.presentation,
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