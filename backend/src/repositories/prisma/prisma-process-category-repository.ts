import { prisma } from "@/lib/prisma";

import { ProcessCategoryRepository } from "@/repositories/process-category-repository";

import { 
  ProcessCategory, 
  ProcessCategoryCreateDTO 
} from "@shared/types/processCategory";
import { OptionsControlledBox } from "@shared/types/values";


export class PrismaProcessCategoryRepository implements ProcessCategoryRepository {
  create(data: ProcessCategoryCreateDTO): Promise<ProcessCategory> {
    throw new Error("Method not implemented.");
  }
  
  async findById(id: string): Promise<ProcessCategory | null> {
    return prisma.processCategory.findUnique({
      where: {
        id
      }
    })
  }

  async findManyOptionCategories(): Promise<OptionsControlledBox[]> {
    const categories = await prisma.processCategory.findMany({
      where: {
        deletedAt: null
      }
    })

    return categories.map((category) => ({
      label: category.name,
      value: category.id
    }))
  }
}