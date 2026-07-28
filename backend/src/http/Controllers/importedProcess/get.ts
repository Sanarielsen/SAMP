import { 
	FastifyReply, 
	FastifyRequest 
} from "fastify";

import { makeGetImportedProcess } from "@/services/factories/imported-process/make-get";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
	
	
export async function getImportedProcess(request: FastifyRequest, reply: FastifyReply) {
	
	const { id } = request.params as { id: string }

	try {
		const useCase = makeGetImportedProcess();

		const object = await useCase.execute(id)

		return reply.status(200).send(object);

	} catch (err) {
		if (err instanceof ResourceNotFoundError) {
			return reply.status(404).send({ message: err.message })
		}

		throw err
	}
}