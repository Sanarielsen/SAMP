import { CreateUserRoleDTO, UserRole } from "@shared/types/userRole"

export interface UserRoleRepository {
  create(data: CreateUserRoleDTO): Promise<UserRole>

  findById(id: string): Promise<UserRole | null>
  findByName(name: string): Promise<UserRole | null>
  findManyByLevelGreaterThanOrEqual(level: number, hasJoker: number): Promise<UserRole[] | null>
}