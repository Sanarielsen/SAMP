import z from "zod";

export const updatePaymentInstallment = z.object({
  installment: z.string(),
  amountInCents: z.string(),
  methodId: z.string(),
  dueDate: z.string(),
  paidAt: z.string().optional(),
  receiptFilePath: z.string().optional(),
  obserservation: z.string().optional(),
})

export type UpdatePaymentInstallmentSchemaFormData =
  z.infer<typeof updatePaymentInstallment>;