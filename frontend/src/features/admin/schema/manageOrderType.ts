import { z } from "zod";

export const manageOrderTypeSchema = z.object({
  title: z.string({
    error: "Informe o titulo desse tipo de ordem de serviço.",
  }).min(1, "Informe o titulo desse tipo de ordem de serviço.",),
  description: z.string({
    error: "Informe a descrição desse tipo de ordem de serviço.",
  }).min(1, "Informe a descrição desse tipo de ordem de serviço."),
  order: z.coerce.number({
    error: "Informe a ordem desse tipo de ordem de serviço.",
  }).min(1, "Informe a ordem desse tipo de ordem de serviço."),
  observation: z.string().optional(),
});

export type ManageOrderTypeFormInput =
  z.input<typeof manageOrderTypeSchema>;

export type ManageOrderTypeFormOutput =
  z.output<typeof manageOrderTypeSchema>;