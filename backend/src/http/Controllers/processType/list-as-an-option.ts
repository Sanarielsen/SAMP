import { 
  FastifyReply, 
  FastifyRequest 
} from "fastify";

import { 
  makeListProcessTypeAsAnOptionUseCase 
} from "@/services/factories/process-type/make-list-as-an-option";


export async function listProcessTypeAsAnOption(_: FastifyRequest, reply: FastifyReply) {

  try {
    const useCase = makeListProcessTypeAsAnOptionUseCase();

    const processTypes = await useCase.execute()

    return reply.status(200).send(processTypes);

  } catch (err) {
    throw err
  }
}