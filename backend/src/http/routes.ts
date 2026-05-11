import { FastifyInstance } from "fastify";

import { authenticate } from "@/http/Controllers/authenticate";
import { register } from "@/http/Controllers/register";
import { newClient } from "@/http/Controllers/client";

export async function appRoutes(app: FastifyInstance) {

  app.post('/users', register)
  app.post('/session', authenticate)

  //@Routes - Client
  //app.get('/clients', authenticate)
  app.post('/client', newClient)

}