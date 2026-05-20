import { RepresentativeEntire, RepresentativeCustom, RepresentativeList } from '@shared/types/representative'

export interface RepresentativeRepository {
  create(data: RepresentativeEntire): Promise<RepresentativeEntire>

  update(data: RepresentativeCustom): Promise<RepresentativeCustom>

  delete(id: string): Promise<void>

  findById(id: string): Promise<RepresentativeEntire | null>
  findByIdUserWithSearchRepresentativesOnlyClientsActivated(idUser: string, search: string): Promise<RepresentativeEntire[] | null>
  findManyByUserIdWithSearch(userId: string, search: string): Promise<RepresentativeEntire[] | null>
}