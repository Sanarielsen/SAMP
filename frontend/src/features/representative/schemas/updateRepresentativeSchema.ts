import { z } from "zod";

export const manageRepresentativeSchema = z.object({

  clientId: z.string({error: 'Informe a empresa que esse representante responde.'}),
  name: z.string({error: 'Informe o nome do representante.'}).trim(),
  nationality: z.string({error: 'Informe a nacionalidade do representante.'}).trim(),
  documentRG: z.string({error: 'Informe o RG do representante.'}).trim(),
  documentCPF: z.string({error: 'Informe o CPF do representante.'}).trim(),
  titleJob: z.string({error: 'Informe a profissao deste representante.'}),
  roleJob: z.string({error: 'Informe o cargo do representante.'}).trim()
});

export type ManageRepresentativeSchemaFormData =
  z.infer<typeof manageRepresentativeSchema>;
