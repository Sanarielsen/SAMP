import z from "zod";

const dateStringSchema = z
  .string()
  .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Formato inválido. Use DD/MM/YYYY")
  .refine((dateStr) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    
    const date = new Date(year, month - 1, day);
    
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }, "Data inválida ou inexistente");

export const updatePaymentInstallment = z.object({
  installment: z.string(),
  amountInCents: z.string(),
  methodId: z.number(),
  dueDate: dateStringSchema,
  paidAt: dateStringSchema.optional().or(z.literal("")),
  receiptFilePath: z.string().optional(),
  obserservation: z.string().optional(),
});

export type UpdatePaymentInstallmentSchemaFormData =
  z.infer<typeof updatePaymentInstallment>;