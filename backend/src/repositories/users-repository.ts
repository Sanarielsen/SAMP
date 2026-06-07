import { CreateUserDTO, UpdateUserDTO, User, UserDetailDTO, UserPublicDTO } from "@shared/types/user"

export interface UsersRepository {
  create(data: CreateUserDTO): Promise<User>
  update(data: UpdateUserDTO): Promise<User>

  findById(id: string): Promise<UserPublicDTO | null>
  findByEmail(email: string): Promise<UserPublicDTO|null>
  findBySearch(search: string): Promise<UserDetailDTO[]>
}