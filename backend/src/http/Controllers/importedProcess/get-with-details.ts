import { FastifyRequest, FastifyReply } from 'fastify'

import { makeGetProcessImportedWithDetails } from '@/services/factories/imported-process/make-get-imported-process-details';

import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';


export async function getProcessImportedDetails(request: FastifyRequest, reply: FastifyReply) {
  
  const { id } = request.params as { id: string }

  try {
    const useCase = makeGetProcessImportedWithDetails();

    const processHistory = await useCase.execute(id)

    return reply.status(200).send(processHistory);

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}