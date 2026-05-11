import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "@/services/register";
import { NewClientUseCase } from "../new-client";
import { PrismaClientsRepository } from "@/repositories/prisma/prisma-clients-repository";

export function makeNewClientUseCase() {
  const clientsRepository = new PrismaClientsRepository();
  const usersRepository = new PrismaUsersRepository();
  const clientUseCase = new NewClientUseCase(clientsRepository, usersRepository);

  return clientUseCase
}