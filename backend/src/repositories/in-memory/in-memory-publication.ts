import { createId } from "@paralleldrive/cuid2";

import { PublicationRepository } from "@/repositories/publication-repository";
import { InMemoryProcessHistoryRepository } from "@/repositories/in-memory/in-memory-process-history";
import { InMemoryProcessTypeRepository } from "@/repositories/in-memory/in-memory-process-type";
import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { InMemoryUserRoleRepository } from "@/repositories/in-memory/in-memory-user-role-repository";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { 
  Publication, 
  CreatePublicationDTO,
  PublicationDetails,
} from "@shared/types/publication";


export class InMemoryPublicationRepository implements PublicationRepository {
  constructor(
    private userRoleRepository: InMemoryUserRoleRepository,
    private userRepository: InMemoryUserRepository,
    private clientRepository: InMemoryClientsRepository,
    private processHistoryRepository: InMemoryProcessHistoryRepository,
    private processTypeRepository: InMemoryProcessTypeRepository
  ) {}
  public items: Publication[] = []

  async create(data: CreatePublicationDTO): Promise<Publication> {
    const newPublication: Publication = {
      ...data,
      id: createId(),
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      deletedAt: null
    }
    
    this.items.push(newPublication)
        
    return newPublication
  }
  
  async createTransferImportedProcess(data: CreatePublicationDTO): Promise<Publication> {
    throw new Error("Method not implemented.");
  }
  
  async findManySearchByUserId(userId: string, search?: string): Promise<PublicationDetails[] | null> {

    return this.items
      .filter((publication) => {
        const matchesSearch =
          !search || publication.processNumber.includes(search)

        if (!userId) {
          throw new ResourceNotFoundError();
        }

        const client = this.clientRepository.items.find(
          (client) => client.id === publication.clientId,
        )

        if (!client) {
          throw new ResourceNotFoundError();
        }

        const user = this.userRepository.items.find(
          (user) => user.id === userId,
        )

        if (!user) {
          throw new ResourceNotFoundError();
        }

        const userRole = this.userRoleRepository.items.find(
          (role) => role.id === user.roleId,
        )

        if (!userRole) {
          throw new ResourceNotFoundError();
        }

        //If currentUser is considered a ADMIN (Level=1)
        if (userRole.level === 1) {
          return (
            matchesSearch
          )
        }

        return (
          matchesSearch &&
          client.responsibleById === userId
        )
      })
      .map((publication) => {
        const client = this.clientRepository.items.find(
          (client) => client.id === publication.clientId,
        )

        const processHistory = this.processHistoryRepository.items.find(
          (history) => history.id === publication.processHistoryId,
        )

        const processType = this.processTypeRepository.items.find(
          (type) => type.id === publication.processTypeId,
        )

        if (!client || !processHistory || !processType) {
          throw new ResourceNotFoundError();
        }

        return {
          ...publication,

          clientName: client.tradeName,
          clientProtocol: client.protocol,

          processTypeName: processType.name,
          processTypeSlug: processType.slug,

          processHistoryMagazine: processHistory.numberMagazine,
        }
      })
    }
}