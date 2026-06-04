import { hash } from "bcryptjs";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { UpdateUserProfileUseCase } from "@/services/service-user/update";

import { EmailInvalidError } from "@/services/errors/email-invalid-error";
import { NonExistUserError } from "@/services/errors/non-exist-user-error";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists";

let userRepository: InMemoryUsersRepository
let sut: UpdateUserProfileUseCase

describe('Update User Profile Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new UpdateUserProfileUseCase(userRepository);
  })

  it('should allow a user to update their own profile', async () => {

    await userRepository.create({
      id: "user-1",
      name: "Samuel Teste",
      email: "Samuel@teste.com",
      password_hash: String(hash("123456", 6)),
      joker: 1,
      roleId: "user",
    })

    await sut.execute({
      id: "user-1",
      name: "Samuel Teste Novo",
      email: "Eitaaa@teste.com",
      roleId: "user"
    })

    expect(userRepository.items[0].name).toBe("Samuel Teste Novo")
    expect(userRepository.items[0].email).toBe("Eitaaa@teste.com")
  })

  it('should not allow updating a user with an email already in use', async () => {

    await userRepository.create({
      id: "user-1",
      name: "Samuel Teste",
      email: "Samuel@teste.com",
      password_hash: String(hash("123456", 6)),
      joker: 1,
      roleId: "user",
    })

    await userRepository.create({
      id: "user-2",
      name: "Henrique Teste",
      email: "henrique@teste.com",
      password_hash: String(hash("123456", 6)),
      joker: 1,
      roleId: "user",
    })

    expect( async () =>
      await sut.execute({
        id: "user-1",
        name: "Samuel Teste Novo",
        email: "henrique@teste.com",
        roleId: "user"
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should not allow updating with an invalid email', async () => {

    await userRepository.create({
      id: "user-2",
      name: "Samuel Teste",
      email: "Samuel@teste.com",
      password_hash: String(hash("123456", 6)),
      joker: 1,
      roleId: "user",
    })

    expect( async () =>
      await sut.execute({
        id: "user-1",
        name: "Samuel Teste Novo",
        email: "Eitaa____teste.com",
        roleId: "user"
      })
    ).rejects.toBeInstanceOf(EmailInvalidError)
  })

  it('should not allow updating a non-existing user', async () => {

    expect( async () =>
      await sut.execute({
        id: "user-1",
        name: "Samuel Teste Novo",
        email: "Eitaa____teste.com",
        roleId: "user"
      })
    ).rejects.toBeInstanceOf(NonExistUserError)
  })
})