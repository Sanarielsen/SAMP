import { FastifyInstance } from "fastify";

import { authenticate } from "@/http/Controllers/authenticate";
import { profile } from "@/http/Controllers/profile";
import { register } from "@/http/Controllers/register";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { 
  getClient,
  listClient,
  postClient,
  updateClient,
  updateClientStatus 
} from "@/http/Controllers/client"
import { 
  listRepresentative, 
  postRepresentative
} from "@/http/Controllers/representative";

export async function appRoutes(app: FastifyInstance) {

  app.post('/users', register)

  app.post('/session', authenticate)

  app.get('/me', {onRequest: [verifyJWT]}, profile)

  app.get('/client/:id', {onRequest: [verifyJWT]}, getClient)
  app.get('/client/user/:id', {onRequest: [verifyJWT]}, listClient)
  app.post('/client', {onRequest: [verifyJWT]}, postClient)
  app.patch('/client/:id', {onRequest: [verifyJWT]}, updateClient)
  app.patch('/client/:id/status', {onRequest: [verifyJWT]}, updateClientStatus)

  //Representatives
  app.get('/client/:id/representatives', {onRequest: [verifyJWT]}, listRepresentative)
  app.post('/client/:id/representative', {onRequest: [verifyJWT]}, postRepresentative)
}