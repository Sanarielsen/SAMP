import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { api } from '@/api/axios'

export type ClientPostPayload = {
  idUser: string
  legalName: string
  tradeName: string
  type: number
  protocol: string
  dataFundation: Date
  locationAddress: string
  correspondenceAddress: string
  nameContact: string
  numberContact: string
  createdAt: Date
  isActivated: boolean
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