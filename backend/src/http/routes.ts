import { FastifyInstance } from "fastify";

import { authenticate } from "@/http/Controllers/authenticate";
import { profile } from "@/http/Controllers/profile";
import { register } from "@/http/Controllers/register";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { 
  getClient,
  listClient,
  listClientWithOptions,
  postClient,
  updateClient,
  updateClientStatus 
} from "@/http/Controllers/client"
import { 
  deleteRepresentative,
  getRepresentative,
  getRepresentativeOfClients,
  listRepresentative, 
  postRepresentative,
  updateRepresentative
} from "@/http/Controllers/representative";
import { postOrder } from "@/http/Controllers/order/post";
import { getOrder } from "@/http/Controllers/order/get";
import { listOrder } from "@/http/Controllers/order/list";
import { updateOrder } from "@/http/Controllers/order/update";
import { deleteOrder } from "@/http/Controllers/order/delete";
import { listOrderType } from "@/http/Controllers/orderTypes/list";

export async function appRoutes(app: FastifyInstance) {

  app.post('/users', register)

  app.post('/session', authenticate)

  app.get('/me', {onRequest: [verifyJWT]}, profile)
  
  app.get('/client/:id', {onRequest: [verifyJWT]}, getClient)
  app.get('/client/user/:id', {onRequest: [verifyJWT]}, listClient)
  app.get('/clients/options', {onRequest: [verifyJWT]}, listClientWithOptions)
  app.post('/client', {onRequest: [verifyJWT]}, postClient)
  app.patch('/client/:id', {onRequest: [verifyJWT]}, updateClient)
  app.patch('/client/:id/status', {onRequest: [verifyJWT]}, updateClientStatus)

  app.get('/representatives', {onRequest: [verifyJWT]}, listRepresentative)
  app.get('/representative/:id', {onRequest: [verifyJWT]}, getRepresentative)
  app.get('/representative/:id/clients', {onRequest: [verifyJWT]}, getRepresentativeOfClients)
  app.post('/representative', {onRequest: [verifyJWT]}, postRepresentative)
  app.patch('/representative/:id', {onRequest: [verifyJWT]}, updateRepresentative)
  app.delete('/representative/:id', {onRequest: [verifyJWT]}, deleteRepresentative)

  app.post('/order', {onRequest: [verifyJWT]}, postOrder)
  app.get('/order/:id', {onRequest: [verifyJWT]}, getOrder)
  app.get('/orders', {onRequest: [verifyJWT]}, listOrder)
  app.patch('/order/:id', {onRequest: [verifyJWT]}, updateOrder)
  app.delete('/order/:id', {onRequest: [verifyJWT]}, deleteOrder)

  app.get('/order/types', {onRequest: [verifyJWT]}, listOrderType)
}