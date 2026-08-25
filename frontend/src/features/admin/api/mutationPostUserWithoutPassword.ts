import { 
  useMutation, 
  type UseMutationOptions 
} from '@tanstack/react-query'

import { api } from '@/api/axios'

import type { CreateUserWithoutPasswordDTO } from '@shared/types/user'


async function postUserWithoutPassword(
  payload: CreateUserWithoutPasswordDTO
): Promise<void> {
  const { data } = await api.post(`/user`, payload)
  return data
}

export function useMutationPostUserWithoutPassword(
  options?: UseMutationOptions<void, Error, CreateUserWithoutPasswordDTO>
) {
  return useMutation({
    mutationFn: postUserWithoutPassword,
    ...options,
  })
}