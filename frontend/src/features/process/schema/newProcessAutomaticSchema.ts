import { z } from "zod";


export const newProcessAutomaticSchema = z.object({
  clientId: z.string({error: 'Informe o cliente a ser considerado nessa salvamento.'}).min(1, 'Informe o cliente a ser considerado nessa salvamento.'),
  processHistoricId: z.string({error: 'Informe a importacão a ser considerada.'}).min(1, 'Informe a importacão a ser considerada.'),
  importedProcessId: z.string({error: 'Informe o processo da importacão selecionada a ser utilizada.'}).min(1, 'Informe o processo da importacão selecionada a ser utilizada.'),
});

export type NewProcessAutomaticFormData = z.infer<typeof newProcessAutomaticSchema>;