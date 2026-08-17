import { 
  FastifyReply, 
  FastifyRequest 
} from "fastify";
  
import { makeDeleteOrderType } from "@/services/factories/order-type/make-delete";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

  
export async function deleteOrderType(request: FastifyRequest, reply: FastifyReply) {
  
  const { id } = request.params as { id: number }

  try {
    const useCase = makeDeleteOrderType();

    await useCase.execute(Number(id))

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}