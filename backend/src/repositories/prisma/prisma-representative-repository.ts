import { prisma } from "@/lib/prisma";
import { RepresentativeCustom, RepresentativeDTO, RepresentativeEntire, RepresentativeList } from "@shared/types/representative";
import { RepresentativeRepository } from "@/repositories/representative-repository";


export class PrismaRepresentativeRepository implements RepresentativeRepository {
  public representatives: RepresentativeEntire[] = []

  async findById(id: string): Promise<RepresentativeEntire | null> {
    
    const representative = prisma.representative.findUnique({
      where: {
        id,
      },
    })

    if (!representative) {
      return null
    }

    return representative
  }

  async findByIdUserWithSearchRepresentativesOnlyClientsActivated(idUser: string, search: string): Promise<RepresentativeList[] | null> {

    const representatives = await prisma.representative.findMany({
      where: {
        deletedAt: null,
        client: {
          responsibleById: idUser
        },
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            nationality: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            documentRG: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            documentCPF: {
              contains: search,
              mode: 'insensitive',
            },
          },
                    {
            titleJob: {
              contains: search,
              mode: 'insensitive',
            },
          },
                    {
            roleJob: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      }
    })

    return representatives
  }

  async findManyByUserIdWithSearch(userId: string, search: string): Promise<RepresentativeEntire[] | null> {
    const representatives = await prisma.representative.findMany({
      where: {
        client: {
          createdById: userId,
        },
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            nationality: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            documentRG: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            documentCPF: {
              contains: search,
              mode: 'insensitive',
            },
          },
                    {
            titleJob: {
              contains: search,
              mode: 'insensitive',
            },
          },
                    {
            roleJob: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
    })

    return representatives
  }
  async create(data: RepresentativeEntire): Promise<RepresentativeEntire> {
    const representative = await prisma.representative.create({
      data: {
        name: data.name,
        nationality: data.nationality,
        documentCPF: data.documentCPF,
        documentRG: data.documentRG,
        titleJob: data.titleJob,
        roleJob: data.roleJob,
        client: {
          connect: {
            id: data.idClient
          }
        }
      }
    })
    
    return representative
  }

  async update(data: RepresentativeCustom): Promise<RepresentativeCustom> {

    return prisma.representative.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(id: string): Promise<void> {

    await prisma.representative.update({
      where: {
        id
      },
      data: {
        deletedAt: new Date(Date.now())
      },
    })
  }
  
}