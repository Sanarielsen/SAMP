import { FastifyInstance } from "fastify";

import { authenticate } from "@/http/Controllers/authenticate";
import { profile } from "@/http/Controllers/profile";
import { register } from "@/http/Controllers/register";
import { verifyJWT } from "./middlewares/verify-jwt";
import { getClient } from "./Controllers/client";

export async function appRoutes(app: FastifyInstance) {

  app.post('/users', register)

  app.post('/session', authenticate)

  app.get('/me', {onRequest: [verifyJWT]}, profile)

  app.get('/client/:id', {onRequest: [verifyJWT]}, getClient)
}