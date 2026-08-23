
import type { UpdatePaymentMethodFormInput } from "../schema/managePaymentMethod";

import type { FormField } from "@/types/form";


export const manageRowPaymentMethodFields =
  (): FormField<UpdatePaymentMethodFormInput>[] => [
    {
      name: "name",
      label: "Nome",
      type: "text",
      grid: {
        xs: 12,
        md: 6,
      },
    },
    {
      name: "order",
      label: "Ordem",
      type: "number",
      grid: {
        xs: 12,
        md: 6,
      },
    },
    {
      name: "observation",
      label: "Observação",
      type: "textarea",
      grid: {
        xs: 12,
      },
    },
  ];