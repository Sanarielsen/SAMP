import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'
import type { CreateOrderDTO } from '@shared/types/orders'


export type OrderPostPayload = CreateOrderDTO 

async function postOrder(
  payload: OrderPostPayload
): Promise<void> {
  const { data } = await api.post('/order', payload)

  return data
}

export function useMutationPostOrder(
  options?: UseMutationOptions<void, Error, OrderPostPayload>
) {
  return useMutation({
    mutationFn: postOrder,
    ...options,
  })
}