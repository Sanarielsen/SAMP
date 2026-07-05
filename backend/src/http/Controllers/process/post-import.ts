import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeImportProcessUseCase } from '@/services/factories/process/make-post-as-a-importer'
import { ImportDataError } from '@/services/errors/import-data-error';

export async function postProcessAsAImporter(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    categoryId: z.string().min(1),
    numberMagazine: z.string().min(1),
  });

  let fileBuffer: Buffer | undefined;

  const fields: Record<string, string> = {};

  for await (const part of request.parts()) {
    if (part.type === "file") {
      if (part.filename) {
        fileBuffer = await part.toBuffer();
      }
    } else {
      fields[part.fieldname] = String(part.value);
    }
  }

  const { categoryId, numberMagazine } = bodySchema.parse(fields);

  const userId = request.user.sub;

  try {
    const useCase = makeImportProcessUseCase();

    await useCase.execute({
      userId,
      categoryId,
      numberMagazine,
      fileMagazine: fileBuffer,
    });

    return reply.status(201).send();
  } catch (err) {
    if (err instanceof ImportDataError) {
      return reply.status(400).send({
        message: err.message,
      });
    }

    throw err;
  }
}