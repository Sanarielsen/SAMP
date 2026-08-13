import { randomUUID } from "node:crypto";

import { ProcessPublicationRepository } from "@/repositories/process-publication-repository";

import { 
  ProcessPublication,
  ProcessPublicationCreateDTO,
  ProcessPublicationCreateFromINPIDTO, 
} from "@shared/types/processPublication";


export class InMemoryProcessPublicationRepository implements ProcessPublicationRepository {
  public items: ProcessPublication[] = []

  async create(data: ProcessPublicationCreateDTO): Promise<ProcessPublication> {
    const processPublication: ProcessPublication = {
      ...data,
      id: crypto.randomUUID(),
      updatedByUser: data.createdByUser,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      deletedAt: null
    }

    this.items.push(processPublication)

    return processPublication
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

  async findById(id: string): Promise<ProcessPublication | null> {
    const processPublication = this.items.find(item => item.id == id)

    if (!processPublication) {
      return null
    }

    return processPublication
  }

  async findManyByProcessFromINPI(processNumber: string): Promise<ProcessPublication[]> {
    throw new Error("Method not implemented.");
  }
}