import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { api } from '@/api/axios'
import type { Client } from '@/features/client/types/clients'

export type ClientPatchPayload = Client & {
  id: string
  idUser: string
}

type ClientPatchResponse = {
  idClient: string
}

async function patchClient(
  payload: ClientPatchPayload
): Promise<ClientPatchResponse> {
  const { data } = await api.patch(`/client/${payload.id}`, payload)

  return data
}

export function useMutationPatchClient(
  options?: UseMutationOptions<ClientPatchResponse, Error, ClientPatchPayload>
) {
  return useMutation({
    mutationFn: patchClient,
    ...options,
  })
}