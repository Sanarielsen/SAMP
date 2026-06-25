import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'

import type { CreateAppointmentDTO } from '@shared/types/appointment'


export type AppointmentPostPayload = CreateAppointmentDTO & {
  clientId: string
}

async function postAppointment(
  payload: AppointmentPostPayload
): Promise<void> {
  const { data } = await api.post(`/client/${payload.clientId}/appointment`, payload)

  return data
}

export function useMutationPostAppointment(
  options?: UseMutationOptions<void, Error, AppointmentPostPayload>
) {
  return useMutation({
    mutationFn: postAppointment,
    ...options,
  })
}