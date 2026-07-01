import { FastifyRequest, FastifyReply } from 'fastify'

import { makeGetProcessHistoryDetailUseCase } from '@/services/factories/process-category/make-get-details';

import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';


export async function getProcessHistoryDetails(request: FastifyRequest, reply: FastifyReply) {
  
  const { id } = request.params as { id: string }

  try {
    const useCase = makeGetProcessHistoryDetailUseCase();

    const processHistory = await useCase.execute(id)

    return reply.status(200).send(processHistory);

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}