import { hash } from 'bcryptjs'

import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'

import { CreateUserDTO } from '@shared/types/user'


export async function makeUser(
  repository: InMemoryUserRepository,
  override: Partial<CreateUserDTO> = {},
) {
  return repository.create({
    name: 'user-test',
    email: 'test@email.com',
    roleId: 'user-role-test',
    password_hash: await hash('123456', 6),

    ...override,
  })
}