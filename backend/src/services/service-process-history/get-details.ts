import { ProcessHistoryRepository } from "@/repositories/process-historic-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { ProcessHistoryDetailDTO } from "@shared/types/processHistoric";


export class GetProcessHistoryDetailsUseCase {
  constructor(
    private processHistoricRepository: ProcessHistoryRepository,
  ) {}

  async execute(id: string): Promise<ProcessHistoryDetailDTO | null> {

    const processHistory = await this.processHistoricRepository.findAsADetailsById(id)

    if (!processHistory) {
      throw new ResourceNotFoundError() 
    }

    return processHistory
  }
}
