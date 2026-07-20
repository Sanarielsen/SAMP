import { prisma } from "@/lib/prisma";

import { ProcessTypeRepository } from "@/repositories/process-type-repository";

import { ProcessTypeCreateDTO, ProcessType } from "@shared/types/processType";
import { OptionsControlledBox } from "@shared/types/values";


export class PrismaProcessTypeRepository implements ProcessTypeRepository {
  create(data: ProcessTypeCreateDTO): Promise<ProcessType> {
    throw new Error("Method not implemented.");
  }
  
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<ProcessType | null> {
    return await prisma.processType.findUnique({
      where: {
        id
      }
    })
  }

  async findManyAsAnOption(): Promise<OptionsControlledBox[] | null> {
    const types = await prisma.processType.findMany({
      where: {
        deletedAt: null
      }
    })

    if (!types) {
      return null
    }

    return types.map((type) => ({
      label: type.name,
      value: type.id
    }))
  }
}