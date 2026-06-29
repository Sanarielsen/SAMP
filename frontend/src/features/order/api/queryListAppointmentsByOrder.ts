import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

export function optionsQueryListAppointmentsByOrder(id: string) { 
  return queryOptions({
    queryKey: ["appointments-by-order", id],

    queryFn: async () => {
      const { data } = await api.get(`/appointments/order/${id}`)

      return data
    },
  })
}