import { ProcessHistoryRepository } from "@/repositories/process-historic-repository";
import { ProcessHistoryDetailDTO } from "@shared/types/processHistoric";


export class ListProcessHistoryWithDetailsUseCase {
  constructor(
    private processHistoryRepository: ProcessHistoryRepository
  ) {}

  async execute(): Promise<ProcessHistoryDetailDTO[]> {
    
    return await this.processHistoryRepository.findManyWithDetails();
  }
}