import { z } from "zod";


export const searchNewProcessFromINPI = z.object({
  processNumber: z.string({error: 'Informe o número do processo a ser considerado nesse salvamento.'}).min(1, 'Informe o cliente a ser considerado a ser pesquisado.'),
  entireAnswer: z.string({error: 'Pesquise algum processo válido acima para prosseguir.'}).min(1, 'Pesquise algum processo válido acima para prosseguir.'),
});

export type SearchNewProcessFromINPIFormData = z.infer<typeof searchNewProcessFromINPI>;