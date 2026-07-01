import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'
import type { AxiosResponse } from 'axios'

import { 
  type CreatePublicationTransferImportedProcessDTO,
  type Publication, 
} from "@shared/types/publication";


async function postPublicationTransferImportedProcess(payload: CreatePublicationTransferImportedProcessDTO): Promise<AxiosResponse<Publication>> {
  return await api.post(`/publication/process/imported`, payload)
}

export function useMutationPostPublicationTransferImportedProcess(
  options?: UseMutationOptions<AxiosResponse<Publication>, Error, CreatePublicationTransferImportedProcessDTO>
) {
  return useMutation({
    mutationFn: postPublicationTransferImportedProcess,
    ...options,
  })
}