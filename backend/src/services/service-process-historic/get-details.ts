import { ProcessHistoricRepository } from "@/repositories/process-historic-repository";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { DetailsProcessHistoryDTO } from "@shared/types/processHistoric";


export class GetProcessHistoryDetailsUseCase {
  constructor(
    private processHistoricRepository: ProcessHistoricRepository,
  ) {}

  async execute(id: string): Promise<DetailsProcessHistoryDTO | null> {

    const processHistory = await this.processHistoricRepository.findAsADetailsById(id)

    if (!processHistory) {
      throw new ResourceNotFoundError() 
    }

    return processHistory
  }
}
