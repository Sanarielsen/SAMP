import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'


async function deletePublication(id: string): Promise<void> {
  return await api.delete(`/publication/${id}`)
}

export function useMutationDeletePublication(
  options?: UseMutationOptions<void, Error, string>
) {
  return useMutation({
    mutationFn: deletePublication,
    ...options,
  })
}