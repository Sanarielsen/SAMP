import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'

import type { UpdateUserDTO } from '@shared/types/user'


async function patchUser(
  payload: UpdateUserDTO
): Promise<void> {
  const { data } = await api.patch(`/user/${payload.id}`, payload)
  return data
}

export function useMutationPatchUser(
  options?: UseMutationOptions<void, Error, UpdateUserDTO>
) {
  return useMutation({
    mutationFn: patchUser,
    ...options,
  })
}