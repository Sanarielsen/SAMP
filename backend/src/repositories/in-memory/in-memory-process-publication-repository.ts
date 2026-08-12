import { ProcessPublicationRepository } from "@/repositories/process-publication-repository";

import { 
  ProcessPublication,
  ProcessPublicationCreateDTO, 
} from "@shared/types/processPublication";


export class InMemoryProcessPublicationRepository implements ProcessPublicationRepository {
  public items: ProcessPublication[] = []

  async create(data: ProcessPublicationCreateDTO): Promise<ProcessPublication> {
    throw new Error("Method not implemented.");
  }

  async findManyByProcessFromINPI(processNumber: string): Promise<ProcessPublication[]> {
    throw new Error("Method not implemented.");
  }
}