import { CreateRepresentativeDTO, Representative, RepresentativeOptionDTO, UpdateRepresentativeDTO } from "@shared/types/representative"

export interface RepresentativeRepository {
  create(data: CreateRepresentativeDTO): Promise<Representative>

  update(data: UpdateRepresentativeDTO): Promise<Representative>

  delete(id: string): Promise<Representative>

  findById(id: string): Promise<Representative | null>
  findByIdUserWithSearchRepresentativesOnlyClientsActivated(idUser: string, search: string): Promise<Representative[]>
  findManyByUserIdWithSearch(userId: string, search: string): Promise<Representative[] | null>
  findManyRepresentsOnClientsId(idClient: string): Promise<RepresentativeOptionDTO[] | null>
}