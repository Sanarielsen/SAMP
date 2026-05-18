import { RepresentativeEntire, RepresentativeDTO } from '@shared/types/representative'

export interface RepresentativeRepository {
  create(data: RepresentativeEntire): Promise<RepresentativeEntire>

  findById(id: string): Promise<RepresentativeEntire | null>
  findManyByUserIdWithSearch(userId: string, search: string): Promise<RepresentativeEntire[] | null>
}