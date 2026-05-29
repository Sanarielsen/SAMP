import { z } from "zod";

export const manageOrderServiceSchema = z.object({

  clientId: z.string(({
    error: 'Informe o cliente que esta ordem de serviço será correspondente.'
  })),
  orderTypeId: z.string(({
    error: 'Informe o tipo de O.S que esta ordem de serviço será.'
  })),
  description: z.string({
    error: 'Informe a descricao que esta ordem de serviço terá.'
  }).trim().min(1, 'Informe a descricao que esta ordem de serviço terá.'),
  observation: z.string().optional(),
  eventDate: z.string({
    error: 'Informe quando será a data desta ordem de serviço.'
  }).trim().min(1, 'Informe quando será a data desta ordem de serviço.'),
});

export type ManageOrderSchemaFormData =
  z.infer<typeof manageOrderServiceSchema>;
