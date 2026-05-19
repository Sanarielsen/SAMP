import { prisma } from "@/lib/prisma";
import { RepresentativeRepository } from "@/repositories/representative-repository";
import { CreateRepresentativeDTO, Representative, RepresentativeOptionDTO, UpdateRepresentativeDTO } from "@shared/types/representative";


export class PrismaRepresentativeRepository implements RepresentativeRepository {
  public representatives: Representative[] = []

  async findById(id: string): Promise<Representative | null> {
    
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

  async findByIdUserWithSearchRepresentativesOnlyClientsActivated(idUser: string, search: string): Promise<Representative[] | null> {

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
      },
    })

    return representatives
  }

  async findManyByUserIdWithSearch(userId: string, search: string): Promise<Representative[] | null> {
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

  async findManyRepresentsOnClientsId(id: string): Promise<RepresentativeOptionDTO[] | null> {
    const representatives =
      await prisma.representative.findMany({
        where: {
          id,
          deletedAt: null,
        },
        select: {
          client: {
            select: {
              id: true,
              legalName: true,
            },
          },
        },
      })

    if (!representatives.length) {
      return null
    }

    return representatives.map(representative => ({
      label: representative.client.legalName,
      value: representative.client.id,
    }))
  }

  async create(data: CreateRepresentativeDTO): Promise<Representative> {

    const representative = await prisma.representative.create({
      data
    })
    
    return representative
  }

  async update(data: UpdateRepresentativeDTO): Promise<Representative> {

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