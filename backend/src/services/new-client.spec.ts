
//Cria um cliente com base em um usuário logado
// - Cancela quando for criado com um usuário que não existe
import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-clients-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { NewClientUseCase } from "./new-client";
import { ClientAlreadyExistsError } from "./errors/client-already-exists";

let userRepository: InMemoryUsersRepository
let clientRepository: InMemoryClientsRepository
let sut: NewClientUseCase

describe('Register new client', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    clientRepository = new InMemoryClientsRepository()
    sut = new NewClientUseCase(clientRepository, userRepository)
  })

  it('should be able to register', async () => {

    const { client } = await sut.execute({
      idUser: "user-1",
      legalName: "Sanarielsen",
      tradeName: "Samuel Henrique",
      type: 1,
      protocol: "12312312323",
      dataFundation: new Date(Date.now()),
      locationAddress: "Rua 2",
      correspondenceAddress: "Rua 3",
      nameContact: "Abilio Correa",
      numberContact: "11212341234",
      createdByUser: "user-1",
      responsableId: "user-1"
    })
    
    expect(client.id).toEqual(expect.any(String))
  })

  it('it not allowed to register client if have other client with same protocol', async () => {  

    const protocol = "12312312312";

    await sut.execute({
      idUser: "user-1",
      legalName: "Sanarielsen",
      tradeName: "Samuel Henrique",
      type: 1,
      protocol: protocol,
      dataFundation: new Date(Date.now()),
      locationAddress: "Rua 2",
      correspondenceAddress: "Rua 3",
      nameContact: "Abilio Correa",
      numberContact: "11212341234",
      createdByUser: "user-1",
      responsableId: "user-1"
    })

    await expect(() => sut.execute({
      idUser: "user-1",
      legalName: "Sanarielsen 2",
      tradeName: "Samuel Henrique 2",
      type: 2,
      protocol: protocol,
      dataFundation: new Date(Date.now()),
      locationAddress: "Rua 2",
      correspondenceAddress: "Rua 3",
      nameContact: "Abilio Correa",
      numberContact: "11212341234",
      createdByUser: "user-1",
      responsableId: "user-1"
    })).rejects.toBeInstanceOf(ClientAlreadyExistsError)
  })
})