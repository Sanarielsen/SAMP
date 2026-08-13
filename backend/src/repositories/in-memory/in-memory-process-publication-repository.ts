import { randomUUID } from "node:crypto";

import { ProcessPublicationRepository } from "@/repositories/process-publication-repository";

import { 
  ProcessPublication,
  ProcessPublicationCreateDTO,
  ProcessPublicationCreateFromINPIDTO,
  ProcessPublicationFromINPI, 
} from "@shared/types/processPublication";


export class InMemoryProcessPublicationRepository implements ProcessPublicationRepository {
  public items: ProcessPublication[] = []

  create(data: ProcessPublicationCreateDTO): Promise<ProcessPublication> {
    throw new Error("Method not implemented.");
  }

  async createMany(data: ProcessPublicationCreateFromINPIDTO): Promise<number> {
    
    const newProcessPublications = data.publications.map((publication) => ({
      ...publication,
      id: randomUUID(),
      importedProcessId: data.importedProcessId,
      publicationDate: new Date(publication.publicationDate),
      createdByUser: data.createdByUser,
      updatedByUser: data.createdByUser,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    }));

    this.items.push(...newProcessPublications);

    return newProcessPublications.length;
  }

  async findManyByProcessFromINPI(processNumber: string): Promise<ProcessPublication[]> {
    throw new Error("Method not implemented.");
  }
}