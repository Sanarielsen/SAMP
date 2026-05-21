import { CreateRepresentativeDTO, Representative, UpdateRepresentativeDTO } from "@shared/types/representative"

export interface RepresentativeRepository {
  create(data: CreateRepresentativeDTO): Promise<Representative>

  update(data: UpdateRepresentativeDTO): Promise<Representative>

  delete(id: string): Promise<void>

  findById(id: string): Promise<Representative | null>
  findByIdUserWithSearchRepresentativesOnlyClientsActivated(idUser: string, search: string): Promise<Representative[] | null>
  findManyByUserIdWithSearch(userId: string, search: string): Promise<Representative[] | null>
}