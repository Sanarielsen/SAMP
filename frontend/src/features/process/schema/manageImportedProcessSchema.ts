import { z } from "zod";


export const manageImportedProcessSchema = z.object({
  clientId: z.string({error: 'Informe o cliente a ser considerado nessa publicação.'}),
  processMagazine: z.string({error: 'Informe a revista desse processo.'}).min(1, 'Informe a revista desse processo'),
  processNumber: z.string({error: 'Informe o cliente a ser considerado nessa salvamento.'}).min(1, 'Informe o cliente a ser considerado nessa salvamento.'),
  processStatus: z.string({error: 'Informe o status do processo a ser considerado nessa publicação.'}).min(1, "Informe o status do processo a ser considerado nessa publicação."),
  holder: z.string({error: 'Informe o titular dessa publicação.'}).min(1, 'Informe o titular dessa publicação.'),
  brand: z.string({error: 'Informe a marca dessa publicação.'}).min(1, 'Informe a marca dessa publicação.'),
  nature: z.string({error: 'Informe a natureza dessa publicação.'}).min(1, 'Informe a natureza dessa publicação.'),
  presentation: z.string({error: 'Informe qual o tipo de apresentação da marca dessa publicação.'}).min(1, 'Informe qual o tipo de apresentação da marca dessa publicação.'),
  specification: z.string({error: 'Informe as especificações dessa publicação.'}).min(1, 'Informe as especificações dessa publicação.'),
  filingDate: z.string().optional(),
  grantDate: z.string().optional(),
  expirationDate: z.string().optional(),
});

export type ManageImportedProcessFormData = z.infer<typeof manageImportedProcessSchema>;