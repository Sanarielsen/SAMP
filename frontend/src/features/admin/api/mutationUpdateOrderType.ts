import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'

import type { OrderTypeUpdateDTO } from '@shared/types/orderType'


async function patchOrderType(
  payload: OrderTypeUpdateDTO
): Promise<void> {
  const { data } = await api.patch(`/order/type/${payload.id}`, payload)
  return data
}

export function useMutationPatchOrderType(
  options?: UseMutationOptions<void, Error, OrderTypeUpdateDTO>
) {
  return useMutation({
    mutationFn: patchOrderType,
    ...options,
  })
}