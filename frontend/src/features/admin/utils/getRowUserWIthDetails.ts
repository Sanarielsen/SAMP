import type { Field } from "@/utils/field";

import type { UserDetailDTO } from "@shared/types/user";


export const userFields: Field<UserDetailDTO>[] = [
  {
    title: 'Nome',
    get: (c: UserDetailDTO) => c.name,
  },
  {
    title: 'E-mail',
    get: (c: UserDetailDTO) => c.email,
  },
  {
    title: 'Cargo',
    get: (c: UserDetailDTO) => c.userRoleName,
  },
  {
    title: 'Criado em',
    get: (c: UserDetailDTO) => new Date(c.createdAt).toLocaleDateString(),
  },
  {
    title: 'Atualizado em',
    get: (c: UserDetailDTO) => c.updatedAt ? new Date(c.updatedAt).toLocaleDateString() : ""
  },
]