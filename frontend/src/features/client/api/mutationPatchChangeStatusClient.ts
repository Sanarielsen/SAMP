import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { api } from '@/api/axios'

export type ClientChangeStatusPayload = {
  id: string
  isActivated: boolean
}

type ClientChangeStatusResponse = {
  id: string
}

async function patchClient(
  payload: ClientChangeStatusPayload
): Promise<ClientChangeStatusResponse> {
  const { data } = await api.patch(`/client/${payload.id}/status`, payload)

  return data
}

export function useMutationChangeStatusClient(
  options?: UseMutationOptions<ClientChangeStatusResponse, Error, ClientChangeStatusPayload>
) {
  return useMutation({
    mutationFn: patchClient,
    ...options,
  })
}