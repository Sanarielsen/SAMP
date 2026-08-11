import { 
  useMutation, 
  type UseMutationOptions 
} from '@tanstack/react-query'

import { api } from '@/api/axios'


async function deleteProcessPublication(
  id: string
): Promise<void> {
  const { data } = await api.delete(`/publication/${id}`)

  return data
}

export function useMutationDeleteProcessPublication(
  options?: UseMutationOptions<void, Error, string>
) {
  return useMutation({
    mutationFn: deleteProcessPublication,
    ...options,
  })
}