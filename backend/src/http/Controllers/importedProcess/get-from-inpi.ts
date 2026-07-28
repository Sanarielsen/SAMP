import { 
	FastifyReply, 
	FastifyRequest 
} from "fastify";

import { makeGetImportedProcessFromINPIUseCase } from "@/services/factories/imported-process/make-get-from-inpi";
import { INPIUnavailableError } from "@/services/errors/inpi-unavailable-error";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
	
	
export async function getProcessFromINPI(request: FastifyRequest, reply: FastifyReply) {
	
	const { processNumber } = request.params as { processNumber: string }

	try {
		const useCase = makeGetImportedProcessFromINPIUseCase();

		const object = await useCase.execute(processNumber)

		return reply.status(200).send(object);
	} catch (err) {
		if (err instanceof ResourceNotFoundError) {
			return reply.status(404).send({ message: err.message })
		}
		if (err instanceof INPIUnavailableError) {
			return reply.status(503).send({ message: err.message })
		}

		throw err
	}
}