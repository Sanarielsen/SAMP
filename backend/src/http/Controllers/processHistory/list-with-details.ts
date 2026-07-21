import { makeListProcessHistoryWithDetails } from "@/services/factories/process-history/make-list-with-details";
import { 
  FastifyReply, 
  FastifyRequest 
} from "fastify";


export async function listProcessHistoryWithDetails(request: FastifyRequest, reply: FastifyReply) {

  try {
    const useCase = makeListProcessHistoryWithDetails();

    const object = await useCase.execute()

    return reply.status(200).send(object);
  } catch (err) {
    throw err
  }
}