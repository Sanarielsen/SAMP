import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'

import type { UpdateAppointmentDTO } from '@shared/types/appointment'


async function patchAppointment(payload: UpdateAppointmentDTO) {
  const { data } = await api.patch(`/appointment/${payload.id}`, payload)

  return data
}

export function useMutationPatchAppointment(
  options?: UseMutationOptions<void, Error, UpdateAppointmentDTO>
) {
  return useMutation({
    mutationFn: patchAppointment,
    ...options,
  })
}