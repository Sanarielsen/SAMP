import type { ManageRepresentativeSchemaFormData } from "@/features/representative/schemas/updateRepresentativeSchema";

export const emptyRepresentative:
  ManageRepresentativeSchemaFormData = {

  clientId: '',
  name: '',
  nationality: '',
  documentRG: '',
  documentCPF: '',
  titleJob: '',
  roleJob: ''
};