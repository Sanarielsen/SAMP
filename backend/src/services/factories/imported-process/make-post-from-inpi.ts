import { PrismaClientRepository } from "@/repositories/prisma/client";
import { PrismaImportedProcessRepository } from "@/repositories/prisma/imported-process"
import { PrismaUserRepository } from "@/repositories/prisma/user";
import { PrismaUserRoleRepository } from "@/repositories/prisma/user-role";
import { PostImportedProcessFromINPIUseCase } from "@/services/use-cases/imported-process/post-from-inpi";


export function makePostImportedProcessFromINPIUseCase() {
  const userRoleRepository = new PrismaUserRoleRepository();
  const userRepository = new PrismaUserRepository();
  const clientRepository = new PrismaClientRepository();
  const importedProcessRepository = new PrismaImportedProcessRepository();

  return new PostImportedProcessFromINPIUseCase(
    userRoleRepository,
    userRepository,
    clientRepository,
    importedProcessRepository,
  )
}