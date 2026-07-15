import { prisma } from "@/lib/prisma";

import { PublicationRepository } from "@/repositories/publication-repository";

import { 
  Publication,
  CreatePublicationDTO, 
} from "@shared/types/publication";


export class PrismaPublicationRepository implements PublicationRepository {
  async createTransferImportedProcess(data: CreatePublicationDTO): Promise<Publication> {
    return await prisma.publication.create({
      data
    })
  }
}