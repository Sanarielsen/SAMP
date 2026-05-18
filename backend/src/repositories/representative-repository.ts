import { RepresentativeEntire, RepresentativeDTO } from '@shared/types/representative'

export interface RepresentativeRepository {
  create(data: RepresentativeEntire): Promise<RepresentativeEntire>

  findManyByUserIdWithSearch(userId: string, search: string): Promise<RepresentativeEntire[] | null>
}