import dayjs from "dayjs";
import z from "zod";

import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const updatePaymentInstallmentToPay = z.object({
  paidAt: z.string().refine(
    (value) =>
      value === "" ||
      dayjs(value, "DD/MM/YYYY", true).isValid(),
    {
      message: "Informe uma data válida.",
    }
  ).nullable(),
});

export type UpdatePaymentInstallmentToPaySchemaFormData =
  z.infer<typeof updatePaymentInstallmentToPay>;