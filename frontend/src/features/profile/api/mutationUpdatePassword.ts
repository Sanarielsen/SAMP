import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'
import type { UpdateUserDTO } from '@shared/types/user'

export type UserProfilePatchPayload = UpdateUserDTO 


async function patchUserProfile(
  payload: UserProfilePatchPayload
): Promise<void> {
  const { data } = await api.patch(`/me`, payload)

  return data
}

export function useMutationPatchUserProfile(
  options?: UseMutationOptions<void, Error, UserProfilePatchPayload>
) {
  return useMutation({
    mutationFn: patchUserProfile,
    ...options,
  })
}