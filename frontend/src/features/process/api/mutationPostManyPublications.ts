import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { api } from '@/api/axios'


type PublicationFromINPI = {
  magazineNumber: string
  publicationDate: string
  dispatch: string
  certificate: string | null
  description: string | null
  complement: string | null
}

async function postManyProcessPublications(
  args: { processId: string; publications: PublicationFromINPI[] }
): Promise<number> {
  const { processId, publications } = args

  const { data } = await api.post(`/process/${processId}/publication`, publications)

  return data.publicacoes as number
}

export function useMutationPostManyProcessPublications(
  options?: UseMutationOptions<number, Error, { processId: string; publications: PublicationFromINPI[] }>
) {
  return useMutation({ mutationFn: postManyProcessPublications, ...options })
}
