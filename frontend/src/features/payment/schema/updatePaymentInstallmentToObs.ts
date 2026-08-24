import z from "zod";


export const updatePaymentInstallmentToObs = z.object({
  observation: z.string().nullable()
});

export type UpdatePaymentInstallmentToObsSchemaFormData =
  z.infer<typeof updatePaymentInstallmentToObs>;