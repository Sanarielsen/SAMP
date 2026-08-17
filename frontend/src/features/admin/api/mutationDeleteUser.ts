import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'


async function deleteUser(
  id: string
): Promise<void> {
  const { data } = await api.delete(`/user/${id}`)
  return data
}

export function useMutationDeleteUser(
  options?: UseMutationOptions<void, Error, string>
) {
  return useMutation({
    mutationFn: deleteUser,
    ...options,
  })
}