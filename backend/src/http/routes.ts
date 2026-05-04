import { FastifyInstance } from "fastify";

import { authenticate } from "@/http/Controllers/authenticate";
import { register } from "@/http/Controllers/register";

export async function appRoutes(app: FastifyInstance) {

  app.post('/users', register)

  app.post('/session', authenticate)
}