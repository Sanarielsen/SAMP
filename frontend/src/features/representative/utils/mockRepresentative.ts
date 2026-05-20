import type { ManageRepresentativeSchemaFormData } from "@/features/representative/schemas/updateRepresentativeSchema";

export const emptyRepresentative:
  ManageRepresentativeSchemaFormData = {

  idClient: '',
  name: '',
  nationality: '',
  documentRG: '',
  documentCPF: '',
  titleJob: '',
  roleJob: ''
};