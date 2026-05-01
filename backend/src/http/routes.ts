import { FastifyInstance } from "fastify";

import { register } from "@/http/Controllers/register";

export async function appRoutes(app: FastifyInstance) {

  app.post('/users', register)
}