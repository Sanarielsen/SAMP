import { 
  useMutation, 
  type UseMutationOptions 
} from '@tanstack/react-query'

import { api } from '@/api/axios'

async function deleteProcessHistoryWithFile(
  id: string
): Promise<void> {
  const { data } = await api.delete(`/process/imported/${id}`)

  return data
}

export function useMutationDeleteProcessHistoryWithFile(
  options?: UseMutationOptions<void, Error, string>
) {
  return useMutation({
    mutationFn: deleteProcessHistoryWithFile,
    ...options,
  })
}