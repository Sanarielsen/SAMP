import { 
  useMutation, 
  type UseMutationOptions 
} from '@tanstack/react-query'

import { api } from '@/api/axios'

async function deletePayment(
  id: string
): Promise<void> {
  const { data } = await api.delete(`/payment/${id}`)

  return data
}

export function useMutationDeletePayment(
  options?: UseMutationOptions<void, Error, string>
) {
  return useMutation({
    mutationFn: deletePayment,
    ...options,
  })
}