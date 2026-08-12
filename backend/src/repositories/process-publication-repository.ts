import {
  ProcessPublication,
  ProcessPublicationCreateDTO
} from "@shared/types/processPublication"


export interface ProcessPublicationRepository {
  create(data: ProcessPublicationCreateDTO): Promise<ProcessPublication>

  findManyByProcessFromINPI(processNumber: string): Promise<ProcessPublication[]>
}