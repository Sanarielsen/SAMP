import { 
  useMutation, 
  type UseMutationOptions 
} from '@tanstack/react-query'

import { api } from '@/api/axios'


async function deletePaymentMethod(
  id: number
): Promise<void> {
  const { data } = await api.delete(`/payment/method/${id}`)
  return data
}

export function useMutationDeletePaymentMethod(
  options?: UseMutationOptions<void, Error, number>
) {
  return useMutation({
    mutationFn: deletePaymentMethod,
    ...options,
  })
}