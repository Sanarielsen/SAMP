import {
  ProcessPublication,
  ProcessPublicationCreateDTO,
  ProcessPublicationCreateFromINPIDTO,
} from "@shared/types/processPublication"


export interface ProcessPublicationRepository {
  create(data: ProcessPublicationCreateDTO): Promise<ProcessPublication>
  createMany(data: ProcessPublicationCreateFromINPIDTO): Promise<number>

  findManyByProcessFromINPI(processNumber: string): Promise<ProcessPublication[]>
}