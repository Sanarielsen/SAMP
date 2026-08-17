import { 
  useMutation, 
  type UseMutationOptions 
} from '@tanstack/react-query'
import { api } from '@/api/axios'

import type { OrderTypeCreateDTO } from '@shared/types/orderType'


async function postOrderType(
  payload: OrderTypeCreateDTO
): Promise<void> {
  const { data } = await api.post(`/order/type`, payload)
  return data
}

export function useMutationPostOrderType(
  options?: UseMutationOptions<void, Error, OrderTypeCreateDTO>
) {
  return useMutation({
    mutationFn: postOrderType,
    ...options,
  })
}