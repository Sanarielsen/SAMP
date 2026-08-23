import type { Field } from "@/types/field";
import { formatDate } from "@/utils/manageDate";

import type { PaymentDetailDTO } from "@shared/types/payment";

export const paymentFields: Field<PaymentDetailDTO>[] = [
  {
    title: 'Total de parcelas',
    get: (c: PaymentDetailDTO) => c.totalInstallments,
  },
  {
    title: 'Último pagamento',
    get: (c: PaymentDetailDTO) => c.lastDueDate ? 
      formatDate(c.lastDueDate)
      : "-",
  },
  {
    title: 'Observação',
    get: (c: PaymentDetailDTO) => c.observation,
  },
  {
    title: 'Data de criação',
    get: (c: PaymentDetailDTO) => formatDate(c.createdAt, true),
    
  },
  {
    title: 'Data de atualização',
    get: (c: PaymentDetailDTO) => c.updatedAt ? 
      formatDate(c.updatedAt, true)
      : "-",
  },
]