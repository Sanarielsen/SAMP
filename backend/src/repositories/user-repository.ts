import { 
  OptionsControlledBox
} from "@shared/types/values"
import { 
  CreateUserDTO, 
  CreateUserWithoutPasswordDTO, 
  UpdateUserDTO, 
  User, 
  UserDetailDTO, 
  UserPasswordUpdateDTO, 
  UserPublicDTO
} from "@shared/types/user"

export interface UserRepository {
  create(data: CreateUserDTO): Promise<User>
  createWithoutPassword(data: CreateUserWithoutPasswordDTO): Promise<User>
  update(data: UpdateUserDTO): Promise<void>
  updatePassword(data: UserPasswordUpdateDTO): Promise<void>
  delete(id: string): Promise<void>

  findById(id: string): Promise<User | null>
  findByIdWithoutPassword(id: string): Promise<UserPublicDTO | null>
  findByEmail(email: string): Promise<UserDetailDTO|null>
  findAuthByEmail(email: string): Promise<User|null>
  findManyBySearchWithRelations(search: string): Promise<UserDetailDTO[]>

  findManyOptions(): Promise<OptionsControlledBox[] | null>
}