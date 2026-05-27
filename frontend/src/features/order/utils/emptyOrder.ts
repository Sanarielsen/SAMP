import type { ManageOrderSchemaFormData } from "@/features/order/schemas/manageOrderServiceSchema";

export const emptyOrder:
  ManageOrderSchemaFormData = {

  clientId: '',
  orderTypeId: '',
  description: '',
  eventDate: '',
  observation: '',
};