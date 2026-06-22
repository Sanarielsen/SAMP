import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

import type { DetailAppointmentDTO } from "@shared/types/appointment"


export function optionsQueryGetAppointmentWithDetails(id: string, isSelected: boolean) { 
  return queryOptions({
    queryKey: ["appointment-details", id],
    enabled: isSelected,
    queryFn: async () => {
      const { data } = await api.get<DetailAppointmentDTO>(`/appointment/${id}/details`)

      return data
    },
  })
}