import { 
  useMutation, 
  type UseMutationOptions 
} from '@tanstack/react-query'

import { api } from '@/api/axios'

import type { UserPasswordUpdateVisualDTO } from '@shared/types/user'


async function patchUserPassword(payload: UserPasswordUpdateVisualDTO) {
  const { data } = await api.patch(`profile/${payload.id}/password`, payload)

  return data
}

export function useMutationUpdateUserPassword(
  options?: UseMutationOptions<void, Error, UserPasswordUpdateVisualDTO>
) {
  return useMutation({
    mutationFn: patchUserPassword,
    ...options,
  })
}