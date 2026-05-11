import { makeGetClientProfileUseCase } from '@/services/factories/make-get-client-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function getClient(request: FastifyRequest, reply: FastifyReply) {
  const getClientProfile = makeGetClientProfileUseCase();

  const { id } = request.params as { id: string }

  console.log(id);

  const profile = await getClientProfile.execute({
    clientId: id
  })

  console.log(profile)

  return reply.status(200).send({
    client: {
      ...profile,
      password_hash: undefined
    }
  });
}