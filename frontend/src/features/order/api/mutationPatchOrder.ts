import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'
import type { UpdateOrderDTO } from '@shared/types/orders'


export type OrderPatchPayload = UpdateOrderDTO 

async function patchOrder(
  payload: OrderPatchPayload
): Promise<void> {
  const { data } = await api.patch(`/order/${payload.id}`, payload)

  return data
}

export function useMutationPatchOrder(
  options?: UseMutationOptions<void, Error, OrderPatchPayload>
) {
  return useMutation({
    mutationFn: patchOrder,
    ...options,
  })
}