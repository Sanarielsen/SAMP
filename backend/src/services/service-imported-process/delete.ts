import { ImportedProcessRepository } from "@/repositories/imported-process-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";


export class DeleteImportedProcessUseCase {
  constructor(
    private importedProcessRepository: ImportedProcessRepository
  ) {}

  async execute(id: string): Promise<void> {
    
    const importedProcessWillBeDeleted = await this.importedProcessRepository.findById(id);
    if (!importedProcessWillBeDeleted) throw new ResourceNotFoundError();

    await this.importedProcessRepository.delete(id);
  }
}