import { InMemoryUserRoleRepository } from '@/repositories/in-memory/user-role'

import { CreateUserRoleDTO } from '@shared/types/userRole'


export async function makeUserRole(
  repository: InMemoryUserRoleRepository,
  override: Partial<CreateUserRoleDTO> = {},
) {
  return repository.create({
    name: 'name-role',
    description: 'user role to test',
    level: 1,
    createdAt: new Date(Date.now()),

    ...override,
  })
}