import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";
import { hash } from "bcryptjs";

import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { UpdateUserProfileUseCase } from "@/services/service-user/update";

import { makeUser } from "@/services/factories/user/make-entity";

import { EmailInvalidError } from "@/services/errors/email-invalid-error";
import { NonExistUserError } from "@/services/errors/non-exist-user-error";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists";

import { User } from "@shared/types/user";

let userRepository: InMemoryUserRepository
let sut: UpdateUserProfileUseCase
let newUser: User

describe('Update User Profile Use Case', () => {
  beforeEach( async () => {
    userRepository = new InMemoryUserRepository()
    sut = new UpdateUserProfileUseCase(userRepository);

    newUser = await makeUser(userRepository)
  })

  it('should allow a user to update their own profile', async () => {

    await sut.execute({
      id: newUser.id,
      name: newUser.name,
    })

    expect(userRepository.items[0].name).toBe("user-test")
  })

  it('should not allow updating a user with an email already in use', async () => {

    await makeUser(userRepository, {
      id: "user-2",
      name: "Pessoa Teste 2",
      email: "person2@teste.com",
      password_hash: String(hash("123456", 6)),
      roleId: "role-1"
    })
    await makeUser(userRepository, {
      id: "user-3",
      name: "Pessoa Teste 3",
      email: "henrique@teste.com",
      password_hash: String(hash("123456", 6)),
      roleId: "role-1"
    })

    expect( async () =>
      await sut.execute({
        id: "user-2",
        name: "Samuel Teste Novo",
        email: "henrique@teste.com",
        roleId: "role-1"
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should not allow updating with an invalid email', async () => {

    await makeUser(userRepository, {
      id: "user-2",
      name: "Samuel Teste",
      email: "Samuel@teste.com",
      password_hash: String(hash("123456", 6)),
      roleId: "role-1"
    })

    await expect( async () =>
      sut.execute({
        id: "user-2",
        email: "Eitaa____teste.com",
      }),
    ).rejects.toBeInstanceOf(EmailInvalidError)
  })

  it('should not allow updating a non-existing user', async () => {

    expect( async () =>
      await sut.execute({
        id: "user-1",
        name: "Samuel Teste Novo",
        email: "Samuel@teste.com",
        roleId: "role-1"
      })
    ).rejects.toBeInstanceOf(NonExistUserError)
  })
})