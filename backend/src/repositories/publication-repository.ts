import { 
  Publication,
  CreatePublicationDTO, 
} from "@shared/types/publication"


export interface PublicationRepository {
  createTransferImportedProcess(data: CreatePublicationDTO): Promise<Publication>
}