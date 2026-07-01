import { prisma } from "@/lib/prisma";

import { ProcessCategoryRepository } from "../process-category-repository";

import { ProcessCategory } from "@shared/types/processCategory";
import { OptionsControlledBox } from "@shared/types/values";


export class PrismaProcessCategoryRepository implements ProcessCategoryRepository {
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