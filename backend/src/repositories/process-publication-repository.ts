import {
  ProcessPublication,
  ProcessPublicationCreateDTO,
  ProcessPublicationUpdateDTO,
  ProcessPublicationCreateFromINPIDTO,
  ProcessPublicationDetails,
} from "@shared/types/processPublication"


export interface ProcessPublicationRepository {
  create(data: ProcessPublicationCreateDTO): Promise<ProcessPublication>
  createMany(data: ProcessPublicationCreateFromINPIDTO): Promise<number>
  update(data: Partial<ProcessPublicationUpdateDTO>): Promise<ProcessPublication>
  delete(id: string): Promise<void>

  findById(id: string): Promise<ProcessPublication | null>
  findByIdDetails(id: string): Promise<ProcessPublicationDetails | null>
  findManyByProcessId(processId: string): Promise<ProcessPublication[]>
  findManyByProcessFromINPI(processNumber: string): Promise<ProcessPublication[]>
}