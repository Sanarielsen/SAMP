import { z } from "zod";

export const manageRepresentativeSchema = z.object({

  clientId: z.string({error: 'Informe a empresa que esse representante responde.'}).min(1, 'Informe a empresa que esse representante responde.'),
  name: z.string({error: 'Informe o nome do representante.'}).trim().min(1, 'Informe o nome do representante.'),
  nationality: z.string({error: 'Informe a nacionalidade do representante.'}).trim().min(1, 'Informe a nacionalidade do representante.'),
  documentRG: z.string({error: 'Informe o RG do representante.'}).trim().min(1, 'Informe o RG do representante.'),
  documentCPF: z.string({error: 'Informe o CPF do representante.'}).trim().min(1, 'Informe o CPF do representante.'),
  titleJob: z.string({error: 'Informe a profissao deste representante.'}).min(1, 'Informe a profissao deste representante.'),
  roleJob: z.string({error: 'Informe o cargo do representante.'}).trim().min(1, 'Informe o cargo do representante.')
});

export type ManageRepresentativeSchemaFormData =
  z.infer<typeof manageRepresentativeSchema>;
