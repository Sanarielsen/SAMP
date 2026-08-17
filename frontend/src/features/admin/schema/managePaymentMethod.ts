import { z } from "zod";

export const updatePaymentMethodSchema = z.object({
  name: z.string({
    error: "Informe o nome desse método de pagamento.",
  }).min(1, "Informe o nome desse método de pagamento.",),
  order: z.coerce.number({
    error:
    "Informe a ordem que esse método de pagamento terá em relação aos outros.",
  })
    .min(
      1,
      "Informe a ordem que esse método de pagamento terá em relação aos outros.",
    ),

  observation: z.string().optional(),
});

export type UpdatePaymentMethodFormInput =
  z.input<typeof updatePaymentMethodSchema>;

export type UpdatePaymentMethodFormOutput =
  z.output<typeof updatePaymentMethodSchema>;