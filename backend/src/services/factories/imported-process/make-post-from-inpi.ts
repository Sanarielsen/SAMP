import { PrismaClientRepository } from "@/repositories/prisma/prisma-client-repository";
import { PrismaImportedProcessRepository } from "@/repositories/prisma/prisma-imported-process-repository"
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { PrismaUserRoleRepository } from "@/repositories/prisma/prisma-user-role-repository";
import { PostImportedProcessFromINPIUseCase } from "@/services/service-imported-process/post-from-inpi";

export function makePostImportedProcessFromINPI() {
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