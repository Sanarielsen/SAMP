import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'


async function deleteApointment(id: string) {
  const { data } = await api.delete(`/appointment/${id}`)

  return data
}

export function useMutationDeleteAppointment(
  options?: UseMutationOptions<void, Error, string>
) {
  return useMutation({
    mutationFn: deleteApointment,
    ...options,
  })
}