import { ProcessPublicationRepository } from "@/repositories/process-publication-repository";

import { 
  ProcessPublication,
  ProcessPublicationCreateDTO, 
} from "@shared/types/processPublication";


export class PrismaProcessPublicationRepository implements ProcessPublicationRepository {
  
  create(data: ProcessPublicationCreateDTO): Promise<ProcessPublication> {
    throw new Error("Method not implemented.");
  }

  findManyByProcessFromINPI(processNumber: string): Promise<ProcessPublication[]> {
    throw new Error("Method not implemented.");
  }
}