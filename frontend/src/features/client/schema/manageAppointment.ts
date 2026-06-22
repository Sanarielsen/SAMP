import { z } from "zod";

export const manageAppointmentSchema = z.object({

  clientId: z.string({error: 'Informe o cliente desse agendamento'}).min(1, 'Informe o cliente desse agendamento'),
  orderId: z.string().trim().optional().nullable(),
  description: z.string({error: 'Informe uma descricão correspondente desse agendamento.'}).trim().min(1, 'Informe uma descricão correspondente desse agendamento.'),
  appointmentAt: z.string({error: 'Informe uma data desse agendamento.'}).trim().min(1, 'Informe uma data desse agendamento.'),
});

export type ManageAppointmentSchemaFormData =
  z.infer<typeof manageAppointmentSchema>;
