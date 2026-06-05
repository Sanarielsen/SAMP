import { CreateUserDTO, UpdateUserDTO, User, UserAuthenticated } from "@shared/types/user"

export interface UsersRepository {
  create(data: CreateUserDTO): Promise<User>
  update(data: UpdateUserDTO): Promise<User>

  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<UserAuthenticated|null>
}