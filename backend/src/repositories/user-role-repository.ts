import { CreateUserRoleDTO, UserRole } from "@shared/types/userRole"

export interface UserRoleRepository {
  create(data: CreateUserRoleDTO): Promise<UserRole>

  findById(id: string): Promise<UserRole | null>
  findManyByLevelGreaterThanOrEqual(level: number, joker: number): Promise<UserRole[] | null>
}