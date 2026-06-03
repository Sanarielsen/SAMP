import { CreateUserDTO, UpdateUserDTO, User } from "@shared/types/user"

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User|null>

  create(data: CreateUserDTO): Promise<User>

  update(data: UpdateUserDTO): Promise<User>
}