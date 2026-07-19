import { InMemoryProcessCategoryRepository } from "@/repositories/in-memory/in-memory-process-category";
import { ProcessCategory } from "@shared/types/processCategory";

export async function makeProcessCategory(
  repository: InMemoryProcessCategoryRepository,
  override: Partial<ProcessCategory> = {},
) {

  return repository.create({
		name: 'category-test',
    description: 'description-test',
    slug: 'slug-test',

    ...override,
  })
}