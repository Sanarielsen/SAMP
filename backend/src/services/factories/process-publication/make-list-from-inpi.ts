import { PrismaUserRoleRepository } from "@/repositories/prisma/prisma-user-role-repository"
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { PrismaImportedProcessRepository } from "@/repositories/prisma/prisma-imported-process-repository";
import { INPIClient } from "@/scripts/get-process-from-inpi";
import { ListProcessPublicationFromINPIUseCase } from "@/services/service-process-publication/list-from-inpi";


export function makeProcessPublicationFromINPIUseCase() {
  const userRoleRepository = new PrismaUserRoleRepository();
  const userRepository = new PrismaUserRepository();
  const importedProcessRepository = new PrismaImportedProcessRepository();
  const INPIparser = new INPIClient()

  return new ListProcessPublicationFromINPIUseCase(
    userRoleRepository,
    userRepository,
    importedProcessRepository,
    INPIparser
  )
}