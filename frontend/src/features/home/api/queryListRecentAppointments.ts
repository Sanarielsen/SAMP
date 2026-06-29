import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"


export function optionsQueryListRecentAppointments(userId: string, howManyDays: number) { 
  return queryOptions({
    queryKey: ["recent-appointments", userId, howManyDays],
    enabled: Boolean(userId) && howManyDays > 0,
    queryFn: async () => {
      const { data } = await api.get(`/appointments/recents/${howManyDays}`)

      return data
    },
  })
}