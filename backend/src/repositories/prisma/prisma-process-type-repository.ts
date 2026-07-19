import { prisma } from "@/lib/prisma";

import { ProcessTypeRepository } from "@/repositories/process-type-repository";

import { ProcessTypeCreateDTO, ProcessType } from "@shared/types/processType";


export class PrismaProcessTypeRepository implements ProcessTypeRepository {
  create(data: ProcessTypeCreateDTO): Promise<ProcessType> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<ProcessType | null> {
    return await prisma.processType.findUnique({
      where: {
        id
      }
    })
  }
}