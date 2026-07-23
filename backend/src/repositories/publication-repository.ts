import { 
  Publication,
  CreatePublicationDTO,
  UpdatePublicationDTO, 
  PublicationDetails,
} from "@shared/types/publication"


export interface PublicationRepository {
  create(data: CreatePublicationDTO): Promise<Publication>
  update(data: UpdatePublicationDTO): Promise<Publication>
  findById(id: string): Promise<Publication | null>
  createTransferImportedProcess(data: CreatePublicationDTO): Promise<Publication>
  findByProcessNumber(processNumber: string): Promise<Publication | null>
  findManySearchByUserId(userId: string, search?: string): Promise<PublicationDetails[] | null>
}