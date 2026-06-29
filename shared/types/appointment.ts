export type Appointment = {
  id:             string,
  clientId:       string,
  orderId?:       string | null,
  appointmentAt:  Date,
  description:    string,
  createdAt:      Date,
  updatedAt?:     Date | null,
  deletedAt?:     Date | null,
}

export type CreateAppointmentDTO = {
  id?:            string,
  clientId:       string,
  orderId?:       string | null,
  description:    string,
  appointmentAt:  Date,
}

export type UpdateAppointmentDTO = {
  id:               string,
  
  clientId?:        string,
  orderId?:         string | null,
  description?:     string,
  appointmentAt?:   Date,
}

export type DetailAppointmentDTO = {
  description: string,
  appointmentAt: string,
  nameClient: string,
  titleOrder: string | undefined,
  createdAt: Date,
  updatedAt: Date,
}

export type AppoitmentItem = {
  id: string,
  description: string,
  appointmentAt: Date,
  clientId:   string,
  clientName: string,
  orderTitle: string | null,
}