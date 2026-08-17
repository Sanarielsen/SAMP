import { 
  useMutation, 
  type UseMutationOptions 
} from '@tanstack/react-query'

import { api } from '@/api/axios'


async function deleteOrderType(
  id: number
): Promise<void> {
  const { data } = await api.delete(`/order/type/${id}`)
  return data
}

export function useMutationDeleteOrderType(
  options?: UseMutationOptions<void, Error, number>
) {
  return useMutation({
    mutationFn: deleteOrderType,
    ...options,
  })
}