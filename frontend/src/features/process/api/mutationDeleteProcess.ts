import { 
  useMutation, 
  type UseMutationOptions 
} from '@tanstack/react-query'

import { api } from '@/api/axios'

async function deleteProcess(
  id: string
): Promise<void> {
  const { data } = await api.delete(`/process/${id}`)

  return data
}

export function useMutationDeleteProcess(
  options?: UseMutationOptions<void, Error, string>
) {
  return useMutation({
    mutationFn: deleteProcess,
    ...options,
  })
}