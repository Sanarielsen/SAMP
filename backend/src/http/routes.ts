import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { authenticate } from "@/http/Controllers/user/authenticate";
import { register } from "@/http/Controllers/user/register";
import { 
  profile, 
  updateProfile 
} from "@/http/Controllers/user/profile";

import { getClientAppointment } from "@/http/Controllers/appointment/get";
import { getAppoimentWithDetails } from "@/http/Controllers/appointment/get-with-details";
import { postClientAppointment } from "@/http/Controllers/appointment/post";
import { listClientAppointments } from "@/http/Controllers/appointment/list";
import { updateClientAppointment } from "@/http/Controllers/appointment/update";
import { deleteAppointment } from "@/http/Controllers/appointment/delete";

import { listUsersWithOptions } from "@/http/Controllers/user/list-options";
import { listOrdersWithOptions } from "@/http/Controllers/order/list-options";
import { postOrder } from "@/http/Controllers/order/post";
import { getOrder } from "@/http/Controllers/order/get";
import { listOrder } from "@/http/Controllers/order/list";
import { updateOrder } from "@/http/Controllers/order/update";
import { deleteOrder } from "@/http/Controllers/order/delete";
import { listOrderType } from "@/http/Controllers/orderTypes/list";
import { listUsersWithSearch } from "@/http/Controllers/user/list";
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
import { sendEmail } from "./Controllers/email/test";
import { listAppointmentsByOrder } from "./Controllers/appointment/list-by-order";
import { listRecentAppointments } from "./Controllers/appointment/list-recents";

import { updateUserPassword } from "./Controllers/user/update-password";
import { getProcessFromINPI } from "./Controllers/importedProcess/get-from-inpi";
import { postImportedProcessFromINPI } from "./Controllers/importedProcess/post-from-inpi";
import { listRepresentative } from "./Controllers/representative/list";
import { getRepresentative } from "./Controllers/representative/get";
import { getRepresentativeOfClients } from "./Controllers/representative/get-with-clients";
import { postRepresentative } from "./Controllers/representative/post";
import { updateRepresentative } from "./Controllers/representative/update";
import { deleteRepresentative } from "./Controllers/representative/delete";
import { getClient } from "./Controllers/client/get";
import { listClient } from "./Controllers/client/list";
import { listClientWithOptions } from "./Controllers/client/list-with-options";
import { postClient } from "./Controllers/client/post";
import { updateClient } from "./Controllers/client/update";
import { updateClientStatus } from "./Controllers/client/delete";
import { listImportedProcessDetailsWithSearch } from "./Controllers/importedProcess/list-search-with-details";
import { getImportedProcess } from "./Controllers/importedProcess/get";
import { updateImportedProcess } from "./Controllers/importedProcess/update";
import { deleteImportedProcess } from "./Controllers/importedProcess/delete";

export async function appRoutes(app: FastifyInstance) {

  app.post('/session', authenticate)
  
  app.get('/me', {onRequest: [verifyJWT]}, profile)
  app.patch('/me', {onRequest: [verifyJWT]}, updateProfile)
  app.patch('/profile/:id/password', {onRequest: [verifyJWT]}, updateUserPassword)
  
  app.post('/user', register)
  app.get('/user/roles', {onRequest: [verifyJWT]}, listUserRoleLevelAuthorized)
  app.get('/option/users', {onRequest: [verifyJWT]}, listUsersWithOptions)
  app.get('/option/client/:id/orders', {onRequest: [verifyJWT]}, listOrdersWithOptions)

  app.get('/admin/users', {onRequest: [verifyJWT]}, listUsersWithSearch)
  app.post('/admin/user/email', {onRequest: [verifyJWT]}, sendEmail)
  
  app.get('/client/:id', {onRequest: [verifyJWT]}, getClient)
  app.get('/client/user/:id', {onRequest: [verifyJWT]}, listClient)
  app.get('/clients/options', {onRequest: [verifyJWT]}, listClientWithOptions)
  app.post('/client', {onRequest: [verifyJWT]}, postClient)
  app.patch('/client/:id', {onRequest: [verifyJWT]}, updateClient)
  app.patch('/client/:id/status', {onRequest: [verifyJWT]}, updateClientStatus)
  app.post('/client/:id/appointment', {onRequest: [verifyJWT]}, postClientAppointment)
  app.get('/client/:id/appointments', {onRequest: [verifyJWT]}, listClientAppointments)

  app.get('/appointment/:id', {onRequest: [verifyJWT]}, getClientAppointment)
  app.get('/appointments/order/:id', {onRequest: [verifyJWT]}, listAppointmentsByOrder)
  app.get('/appointments/recents/:range', {onRequest: [verifyJWT]}, listRecentAppointments)
  app.get('/appointment/:id/details', {onRequest: [verifyJWT]}, getAppoimentWithDetails)
  app.patch(`/appointment/:id`, { onRequest: [verifyJWT] }, updateClientAppointment)
  app.delete(`/appointment/:id`, { onRequest: [verifyJWT] }, deleteAppointment)

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

  app.get('/processes', {onRequest: [verifyJWT]}, listImportedProcessDetailsWithSearch)
  app.get('/process/:id', {onRequest: [verifyJWT]}, getImportedProcess)
  app.get('/process/inpi/:processNumber', {onRequest: [verifyJWT]}, getProcessFromINPI)
  app.post('/process/inpi', {onRequest: [verifyJWT]}, postImportedProcessFromINPI)
  app.patch('/process/:id', {onRequest: [verifyJWT]}, updateImportedProcess)
  app.delete('/process/:id', {onRequest: [verifyJWT]}, deleteImportedProcess)
  
  app.get('/order/types', {onRequest: [verifyJWT]}, listOrderType)
  app.get(`/payment/methods`, {onRequest: [verifyJWT]}, listPaymentMethods)
}