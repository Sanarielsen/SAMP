import {
  ProcessPublication,
  ProcessPublicationCreateDTO,
  ProcessPublicationUpdateDTO,
  ProcessPublicationCreateFromINPIDTO,
} from "@shared/types/processPublication"


export interface ProcessPublicationRepository {
  create(data: ProcessPublicationCreateDTO): Promise<ProcessPublication>
  createMany(data: ProcessPublicationCreateFromINPIDTO): Promise<number>
  update(data: Partial<ProcessPublicationUpdateDTO>): Promise<ProcessPublication>
  delete(id: string): Promise<void>

  findById(id: string): Promise<ProcessPublication | null>
  findManyByProcessId(processId: string): Promise<ProcessPublication[]>
  findManyByProcessFromINPI(processNumber: string): Promise<ProcessPublication[]>
}