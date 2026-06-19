import { 
  CreateUserDTO, 
  UpdateUserDTO, 
  User, 
  UserDetailDTO, 
  UserPublicDTO
} from "@shared/types/user"

export interface UserRepository {
  create(data: CreateUserDTO): Promise<User>
  update(data: UpdateUserDTO): Promise<void>

  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<UserDetailDTO|null>
  findAuthByEmail(email: string): Promise<User|null>
  findBySearch(search: string): Promise<UserDetailDTO[]>
}