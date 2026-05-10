import { FastifyInstance } from "fastify";

import { authenticate } from "@/http/Controllers/authenticate";
import { register } from "@/http/Controllers/register";

export async function appRoutes(app: FastifyInstance) {

  app.post('/users', register)

  //@Routes - Client
  app.get('/clients', authenticate)

  app.post('/session', authenticate)
}