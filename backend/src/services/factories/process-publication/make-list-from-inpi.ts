import { PrismaUserRoleRepository } from "@/repositories/prisma/user-role"
import { PrismaUserRepository } from "@/repositories/prisma/user";
import { PrismaImportedProcessRepository } from "@/repositories/prisma/imported-process";
import { INPIClient } from "@/scripts/get-process-from-inpi";
import { ListProcessPublicationFromINPIUseCase } from "@/services/use-cases/process-publication/list-from-inpi";


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