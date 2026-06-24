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