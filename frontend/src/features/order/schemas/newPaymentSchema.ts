import { z } from "zod";

export const newPaymentSchema = z.object({

  totalAmountInCents: z.string({
    error: 'Informe o valor desse pagamento.'
  }).min(1),
  totalInstallments: z.string({
    error: 'Informe a quantidade de parcelas desse pagamento.'
  }).min(1)    
  .refine((val) => {
      const num = Number(val);
      return Number.isInteger(num) && num > 0;
    }, "Parcelas devem ser maior que 0"),
  method: z.string({
    error: 'Informe o método de pagamento.'
  }).min(1),
  firstDueDate: z.string({
    error: 'Informe a data do primeiro vencimento desse pagamento.'
  }).min(1),
  observation: z.string().optional(),
});

export type NewPaymentSchemaFormData =
  z.infer<typeof newPaymentSchema>;
