import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";
import { ListOptionsUserUseCase } from "@/services/service-user/list-options";

import { makeUser } from "@/services/factories/user/make-entity";

let userRepository: InMemoryUserRepository
let sut: ListOptionsUserUseCase

describe('List With Options Client Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new ListOptionsUserUseCase(userRepository)
  })

  it('should list user options', async () => {
    await makeUser(userRepository)
    await makeUser(userRepository)

    const options = await sut.execute()

    expect(options).toHaveLength(2)
  })
})