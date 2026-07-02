import { prisma } from "@/lib/prisma";

import { ProcessCategoryRepository } from "../process-category-repository";

import { ProcessCategory } from "@shared/types/processCategory";


export class PrismaProcessCategoryRepository implements ProcessCategoryRepository {
  async findById(id: string): Promise<ProcessCategory | null> {
    return prisma.processCategory.findUnique({
      where: {
        id
      }
    })
  }
}