import { z } from "zod";

export const manageOrderServiceSchema = z.object({

  clientId: z.string(({
    error: 'Informe o cliente que este processo será correspondente.'
  })),
  orderTypeId: z.string(({
    error: 'Informe o tipo de O.S que este processo será.'
  })),
  description: z.string({
    error: 'Informe a descricao que esse processo terá.'
  }).trim().min(1, 'Informe a descricao que esse processo terá.'),
  observation: z.string().optional(),
  eventDate: z.string({
    error: 'Informe quando será a data desse processo.'
  }).trim().min(1, 'Informe quando será a data desse processo.'),
});

export type ManageOrderServiceSchemaFormData =
  z.infer<typeof manageOrderServiceSchema>;
