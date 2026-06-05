import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { authenticate } from "@/http/Controllers/authenticate";
import { register } from "@/http/Controllers/register";
import { 
  profile, 
  updateProfile 
} from "@/http/Controllers/profile";
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
import { listUsersWithSearch } from "@/http/Controllers/list";
import { listUserRoleLevelAuthorized } from "@/http/Controllers/userRole/list-level-authorized";
import { getOrderDetails } from "@/http/Controllers/order/get-detail";
import { postPayment } from "@/http/Controllers/payment/post";
import { postPaymentWithInstallments } from "@/http/Controllers/payment/post-with-installments";
import { getOrderPayments } from "@/http/Controllers/payment/list";
import { deletePayment } from "@/http/Controllers/payment/delete";
import { listPaymentInstallments } from "@/http/Controllers/paymentInstallment/list-by-payment";
import { updatePaymentInstallment } from "@/http/Controllers/paymentInstallment/update";
import { listPaymentMethods } from "@/http/Controllers/paymentMethod/list";
import { updatePaymentInstallmentAsPaid } from "@/http/Controllers/paymentInstallment/update-paid";

import { sendEmail } from "./Controllers/test";

export async function appRoutes(app: FastifyInstance) {

  app.post('/session', authenticate)
  
  app.get('/me', {onRequest: [verifyJWT]}, profile)
  app.patch('/me', {onRequest: [verifyJWT]}, updateProfile)
  
  app.post('/user', register)
  app.get('/user/roles', {onRequest: [verifyJWT]}, listUserRoleLevelAuthorized)

  app.get('/admin/users', {onRequest: [verifyJWT]}, listUsersWithSearch)

  app.post('/admin/user/email', {onRequest: [verifyJWT]}, sendEmail)
  
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
  app.get('/order/:id/details', {onRequest: [verifyJWT]}, getOrderDetails)
  app.get('/orders', {onRequest: [verifyJWT]}, listOrder)
  app.patch('/order/:id', {onRequest: [verifyJWT]}, updateOrder)
  app.delete('/order/:id', {onRequest: [verifyJWT]}, deleteOrder)
  app.post('/order/:id/payment', {onRequest: [verifyJWT]}, postPayment)
  app.post('/order/:id/payment/installments', {onRequest: [verifyJWT]}, postPaymentWithInstallments)
  app.get(`/order/:id/payments`, { onRequest: [verifyJWT] }, getOrderPayments)
  
  app.get(`/payment/:id/installments`, {onRequest: [verifyJWT]}, listPaymentInstallments)
  app.patch('/payment/installment/:id', {onRequest: [verifyJWT]}, updatePaymentInstallment)
  app.patch('/payment/installment/:id/paid', {onRequest: [verifyJWT]}, updatePaymentInstallmentAsPaid)
  app.delete('/payment/:id', {onRequest: [verifyJWT]}, deletePayment)

  app.get('/order/types', {onRequest: [verifyJWT]}, listOrderType)
  app.get(`/payment/methods`, {onRequest: [verifyJWT]}, listPaymentMethods)
}