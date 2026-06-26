import type { ManageAppointmentSchemaFormData } from "@/features/client/schema/manageAppointment";
import type { UpdateSchemaFormData } from "@/features/client/schema/updateClientSchema";
import type { DetailAppointmentDTO } from "@shared/types/appointment";

export const emptyClient:
  UpdateSchemaFormData = {

  legalName: "",
  tradeName: "",
  protocol: "",
  fundationDate: "",

  type: 0,

  locationAddress: {
    cep: "",
    street: "",
    number: "",
    district: "",
    city: "",
    state: "",
    country: "",
    complement: "",
  },

  correspondenceAddress: {
    cep: "",
    street: "",
    number: "",
    district: "",
    city: "",
    state: "",
    country: "",
    complement: "",
  },

  nameContact: "",
  numberContact: "",

  draft: {
    locationAddress: undefined,
    correspondenceAddress: undefined,
  },
};

export const emptyAppointment: ManageAppointmentSchemaFormData = {
  clientId: "",
  orderId: "",
  description: "",
  appointmentAt: ""
}

export const emptyAppointmentWithDetails: DetailAppointmentDTO = {
  description: "",
  appointmentAt: "",
  nameClient: "",
  titleOrder: "",
  createdAt: new Date(Date.now()),
  updatedAt: new Date(Date.now()),
}