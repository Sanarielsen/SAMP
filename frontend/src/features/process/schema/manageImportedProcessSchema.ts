import { z } from "zod";


export const manageImportedProcessSchema = z.object({
  clientId: z.string({error: 'Informe o cliente a ser considerado nessa publicação.'}),
  processMagazine: z.string({error: 'Informe a revista desse processo.'}).min(1, 'Informe a revista desse processo'),
  processNumber: z.string({error: 'Informe o cliente a ser considerado nessa salvamento.'}).min(1, 'Informe o cliente a ser considerado nessa salvamento.'),
  processStatus: z.string({error: 'Informe o status do processo a ser considerado nessa publicação.'}).min(1, "Informe o status do processo a ser considerado nessa publicação."),
  holder: z.string({error: 'Informe o titular desse processo.'}).min(1, 'Informe o titular desse processo.'),
  brand: z.string({error: 'Informe a marca desse processo.'}).min(1, 'Informe a marca desse processo.'),
  nature: z.string({error: 'Informe a natureza desse processo.'}).min(1, 'Informe a natureza desse processo.'),
  presentation: z.string({error: 'Informe qual o tipo de apresentação da marca desse processo.'}).min(1, 'Informe qual o tipo de apresentação da marca desse processo.'),
  niceTitle: z.string({error: 'Informe a classe nice desse processo.'}).min(1, 'Informe a classe nice desse processo.'),
  niceStatus: z.string({error: 'Informe a situacão da classe desse processo.'}).min(1, 'Informe a situacão da classe desse processo.'),
  niceSpecification: z.string({error: 'Informe as especificações da classe nice desse processo.'}).min(1, 'Informe as especificações da classe nice desse processo.'),
  filingDate: z.string().optional(),
  grantDate: z.string().optional(),
  expirationDate: z.string().optional(),
});

export type ManageImportedProcessFormData = z.infer<typeof manageImportedProcessSchema>;