import { FastifyRequest, FastifyReply } from 'fastify'

import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { makeImportProcessUseCase } from '@/services/factories/process/make-post-as-a-importer'

export async function postProcessAsAImporter(request: FastifyRequest, reply: FastifyReply) {

  const multipartFile = await request.file();

  if (!multipartFile) {
    throw new ResourceNotFoundError();
  }

  const id = request.user.sub;

  try {
    const useCase = makeImportProcessUseCase();

    await useCase.execute({
      userId: id,
      categoryId: 'ec34c8cf-8e3f-4220-bb63-f547a7b7f184',
      numberMagazine: '2895',
      fileMagazine: multipartFile,
    })

  } catch (err) {
    // if (err instanceof UserNotResponsibleForClientError) {
    //   return reply.status(403).send({ message: err.message })
    // }
    // if (err instanceof ResourceNotFoundError) {
    //   return reply.status(404).send({ message: err.message })
    // }

    throw err
  }
  
  return reply.status(201).send();
}