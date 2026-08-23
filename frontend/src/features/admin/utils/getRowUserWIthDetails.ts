import type { Field } from "@/types/field";
import { formatDate } from "@/utils/manageDate";

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
    get: (c: UserDetailDTO) => formatDate(c.createdAt, true),
  },
  {
    title: 'Atualizado em',
    get: (c: UserDetailDTO) => c.updatedAt ? formatDate(c.updatedAt, true) : ""
  },
]