import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'
import type { Client } from '@/features/client/types/clients'


export type ClientPostPayload = Client & {
  idUser: string
}

type ClientPostResponse = {
  idClient: string
}

async function postClient(
  payload: ClientPostPayload
): Promise<ClientPostResponse> {
  const { data } = await api.post('/client', payload)

  return data
}

export function useMutationPostClient(
  options?: UseMutationOptions<ClientPostResponse, Error, ClientPostPayload>
) {
  return useMutation({
    mutationFn: postClient,
    ...options,
  })
}