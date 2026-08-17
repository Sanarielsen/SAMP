import type { ManageOrderTypeFormInput } from "@/features/admin/schema/manageOrderType";
import type { FormField } from "@/types/form";


export const manageRowOrderTypeFields =
  (): FormField<ManageOrderTypeFormInput>[] => [
    {
      name: "title",
      label: "Título",
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
      name: "description",
      label: "Descriçao",
      type: "text",
      grid: {
        xs: 12,
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