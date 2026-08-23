import { ProcessPublicationRepository } from "@/repositories/process-publication";
import { UserRepository } from "@/repositories/user";
import { UserRoleRepository } from "@/repositories/user-role";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UnauthorizedUserError } from "@/services/errors/unauthorized-user-error";


export class DeleteProcessPublicationUseCase {
  constructor(
    private userRepository: UserRepository,
    private userRoleRepository: UserRoleRepository,
    private processPublicationRepository: ProcessPublicationRepository,
  ) {}

  async execute(id: string, userLoggedId: string): Promise<void> {

    const userLogged = await this.userRepository.findById(userLoggedId)
    if (!userLogged) throw new ResourceNotFoundError();

    const userLoggedRole = await this.userRoleRepository.findById(userLogged.roleId)
    if (!userLoggedRole) throw new ResourceNotFoundError();
    if (userLoggedRole.level > 1) throw new UnauthorizedUserError();

    const processPublication = await this.processPublicationRepository.findById(id)
    if (!processPublication) throw new ResourceNotFoundError();

    await this.processPublicationRepository.delete(id)

  }
}