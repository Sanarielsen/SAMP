import { z } from "zod";


export const manageProcessManualSchema = z.object({
  clientId: z.string({error: 'Informe o cliente a ser considerado nessa publicação.'}),
  processTypeId: z.string({error: 'Informe o tipo do processo a ser considerado nessa publicação.'}),
  processNumber: z.string({error: 'Informe o cliente a ser considerado nessa salvamento.'}).min(1, 'Informe o cliente a ser considerado nessa salvamento.'),
  holder: z.string({error: 'Informe o titular dessa publicação.'}).min(1, 'Informe o titular dessa publicação.'),
  brand: z.string({error: 'Informe a marca dessa publicação.'}).min(1, 'Informe a marca dessa publicação.'),
  nature: z.string({error: 'Informe a natureza dessa publicação.'}).min(1, 'Informe a natureza dessa publicação.'),
  presentation: z.string({error: 'Informe qual o tipo de apresentação da marca dessa publicação.'}).min(1, 'Informe qual o tipo de apresentação da marca dessa publicação.'),
  specification: z.string({error: 'Informe as especificações dessa publicação.'}).min(1, 'Informe as especificações dessa publicação.'),
  publicationDate: z.string().optional(),
  depositDate: z.string().optional(),
  grantDate: z.string().optional(),
});

export type ManageProcessManualFormData = z.infer<typeof manageProcessManualSchema>;