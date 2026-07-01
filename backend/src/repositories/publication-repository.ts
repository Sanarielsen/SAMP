import { 
  Publication,
  CreatePublicationDTO,
  PublicationDetails, 
} from "@shared/types/publication"


export interface PublicationRepository {
  create(data: CreatePublicationDTO): Promise<Publication>
  createTransferImportedProcess(data: CreatePublicationDTO): Promise<Publication>
  findManySearchByUserId(userId: string, search?: string): Promise<PublicationDetails[] | null>
}