import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"
import type { UserRole } from "@shared/types/userRole"

export function optionsQueryListRoleUserAuthorized() { 
  return queryOptions({
    queryKey: ["user-role"],

    queryFn: async () => {
      const { data } = await api.get(`/user/roles`)

      return data.map((role: UserRole) => ({
        label: role.name,
        value: role.id,
      }))
    },
  })
}