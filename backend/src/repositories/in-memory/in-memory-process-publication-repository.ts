import { randomUUID } from "node:crypto";

import { ProcessPublicationRepository } from "@/repositories/process-publication-repository";

import { 
  ProcessPublication,
  ProcessPublicationCreateDTO,
  ProcessPublicationCreateFromINPIDTO,
  ProcessPublicationDetails,
  ProcessPublicationUpdateDTO, 
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

  async update(data: Partial<ProcessPublicationUpdateDTO>): Promise<ProcessPublication> {
    const publicationIndex = this.items.findIndex(current => {
      return current.id === data.id
    })

    const updatedPublication = {
      ...this.items[publicationIndex],
      ...data,
      updatedAt: new Date(),
    }

    this.items[publicationIndex] = updatedPublication

    return updatedPublication
  }

  async delete(id: string): Promise<void> {
    const processPublicationIndex = this.items.findIndex(publication => {
      return publication.id === id
    })

    const disabledProcessPublication = {
      ...this.items[processPublicationIndex],
      deletedAt: new Date(),
    }

    this.items[processPublicationIndex] = disabledProcessPublication
  }

  async findById(id: string): Promise<ProcessPublication | null> {
    const processPublication = this.items.find(item => item.id == id)

    if (!processPublication) {
      return null
    }

    return processPublication
  }

  async findByIdDetails(id: string): Promise<ProcessPublicationDetails | null> {
    const processPublication = this.items.find(item => item.id == id)

    if (!processPublication) {
      return null
    }

    return {
      id: processPublication.id,

      importedProcessId:  processPublication.importedProcessId,
      processHolder:      'holder-test',
      processBrand:       'brand-test',

      magazineNumber:   processPublication.magazineNumber,
      publicationDate:  processPublication.publicationDate,
      dispatch:         processPublication.dispatch,
      certificate:      processPublication.certificate,
      description:      processPublication.description,
      complement:       processPublication.complement,

      createdByUser:  processPublication.createdByUser,
      updatedByUser:  processPublication.updatedByUser,
      createdBy:      'user-created-test',
      updatedBy:      'user-updated-test',
    
      createdAt: processPublication.createdAt,
      updatedAt: processPublication.updatedAt,
      deletedAt: processPublication.deletedAt,
    }
  }

  async findManyByProcessId(processId: string): Promise<ProcessPublication[]> {
    return this.items.filter(item => item.importedProcessId == processId)
  }

  async findManyByProcessFromINPI(processNumber: string): Promise<ProcessPublication[]> {
    throw new Error("Method not implemented.");
  }
}