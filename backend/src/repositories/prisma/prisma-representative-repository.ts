import { prisma } from "@/lib/prisma";
import { RepresentativeEntire } from "@shared/types/representative";
import { RepresentativeRepository } from "@/repositories/representative-repository";


export class PrismaRepresentativeRepository implements RepresentativeRepository {
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
  create(data: RepresentativeEntire): Promise<RepresentativeEntire> {
    throw new Error("Method not implemented.");
  }
  
}