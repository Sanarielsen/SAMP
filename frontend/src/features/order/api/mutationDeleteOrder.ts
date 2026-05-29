import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'

async function deleteOrder(
  id: string
): Promise<void> {
  const { data } = await api.post(`/order/${id}`)

  return data
}

export function useMutationDeleteOrder(
  options?: UseMutationOptions<void, Error, string>
) {
  return useMutation({
    mutationFn: deleteOrder,
    ...options,
  })
}