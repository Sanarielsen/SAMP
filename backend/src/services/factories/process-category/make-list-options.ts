import { PrismaProcessCategoryRepository } from "@/repositories/prisma/prisma-process-category-repository";
import { ListProcessCategoryAsAOptionsUseCase } from "@/services/service-process-category/list-options";


export function makeListProcessCategoryAsAOptionsUseCase() {
  const processCategoryRepository = new PrismaProcessCategoryRepository();
  const useCase = new ListProcessCategoryAsAOptionsUseCase(processCategoryRepository);

  return useCase
}