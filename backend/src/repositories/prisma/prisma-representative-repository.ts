import { prisma } from "@/lib/prisma";
import { RepresentativeDTO, RepresentativeEntire } from "@shared/types/representative";
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
            nacionality: {
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
      data
    })
    
    return representative
  }
  
}