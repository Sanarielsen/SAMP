import { z } from "zod";


export const filterImportedProcessesSchema = z.object({
  search: z.string({error: 'Informe algo a ser buscado nos processos.'}).min(1, 'Informe algo a ser buscado nos processos.'), 
  categoryId: z.string({error: 'Informe a categoria que os processos serão filtrados.'}).min(1, 'Informe a categoria que os processos serão filtrados.'), 
  typeId: z.string().optional(),
  historyId: z.string().optional(),
});

export type FilterImportedProcessesFormData = z.infer<typeof filterImportedProcessesSchema>;