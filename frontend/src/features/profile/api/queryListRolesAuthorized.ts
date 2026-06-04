import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

import type { UserRole } from "@shared/types/userRole"

export function optionsQueryListAuthorizedRoles() { 
  return queryOptions({
    queryKey: ["user-roles"],

    queryFn: async () => {
      const { data } = await api.get(`/user/roles`)

      return data.map((userRole: UserRole) => ({
        value: userRole.id,
        label: userRole.name,
      }))
    },
  })
}