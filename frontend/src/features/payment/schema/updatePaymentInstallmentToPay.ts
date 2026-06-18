import dayjs from "dayjs";
import z from "zod";

import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const updatePaymentInstallmentToPay = z.object({
  paidAt: z.string().refine(
    (value) =>
      //value === "" ||
      dayjs(value, "DD/MM/YYYY", true).isValid(),
    {
      message: "Informe uma data válida.",
    }
  ),
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: "Arquivo obrigatório",
    }).optional(),
});

export type UpdatePaymentInstallmentToPaySchemaFormData =
  z.infer<typeof updatePaymentInstallmentToPay>;