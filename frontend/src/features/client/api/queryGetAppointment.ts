import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"


export function optionsQueryGetAppointment(id: string, isEditing: boolean) { 
  return queryOptions({
    queryKey: ["appointment", id],
    enabled: isEditing,
    queryFn: async () => {
      const { data } = await api.get(`/appointment/${id}`)

      return data
    },
  })
}