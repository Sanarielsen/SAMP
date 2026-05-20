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
  deleteRepresentative,
  getRepresentative,
  listRepresentative, 
  postRepresentative,
  updateRepresentative
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

  //O problema é que tem mais de um cliente atrelado a um user,
  //Ou seja, nao dá pra passar apenas UM cliente ou VARIOS na execucao
  //Corrija a rota para /representatives utilizando o idUser do usuario logado
  //Para trazer todos os clientes responsáveis desse usuário;
  app.get('/representatives', {onRequest: [verifyJWT]}, listRepresentative)
  app.get('/representative/:id', {onRequest: [verifyJWT]}, getRepresentative)
  app.post('/client/:id/representative', {onRequest: [verifyJWT]}, postRepresentative)
  app.patch('/client/:idClient/representative/:idRepresentative', {onRequest: [verifyJWT]}, updateRepresentative)
  app.delete('/representative/:id', {onRequest: [verifyJWT]}, deleteRepresentative)

}