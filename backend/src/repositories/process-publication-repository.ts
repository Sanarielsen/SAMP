import {
  ProcessPublication,
  ProcessPublicationCreateDTO,
  ProcessPublicationCreateFromINPIDTO,
} from "@shared/types/processPublication"


export interface ProcessPublicationRepository {
  create(data: ProcessPublicationCreateDTO): Promise<ProcessPublication>
  createMany(data: ProcessPublicationCreateFromINPIDTO): Promise<number>

  findById(id: string): Promise<ProcessPublication | null>
  findManyByProcessFromINPI(processNumber: string): Promise<ProcessPublication[]>
}