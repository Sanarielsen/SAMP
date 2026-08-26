import { PrismaImportedProcessRepository } from "@/repositories/prisma/imported-process"
import { PrismaUserRepository } from "@/repositories/prisma/user";
import { PrismaUserRoleRepository } from "@/repositories/prisma/user-role";
import { DeleteImportedProcessUseCase } from "@/services/use-cases/imported-process/delete";


export function makeDeleteImportedProcessUseCase() {
  const userRepository = new PrismaUserRepository();
  const userRoleRepository = new PrismaUserRoleRepository();
  const importedProcessRepository = new PrismaImportedProcessRepository();
  return new DeleteImportedProcessUseCase(
    userRepository,
    userRoleRepository,
    importedProcessRepository,
  )
}