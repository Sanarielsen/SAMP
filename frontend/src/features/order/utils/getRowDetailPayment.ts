import type { Field } from "@/utils/field";

import type { PaymentDetailDTO } from "@shared/types/payment";

export const paymentFields: Field<PaymentDetailDTO>[] = [
  {
    title: 'Total de parcelas',
    get: (c: PaymentDetailDTO) => c.totalInstallments,
  },
  {
    title: 'Último pagamento',
    get: (c: PaymentDetailDTO) => c.lastDueDate ? 
      new Date(c.lastDueDate).toLocaleDateString() 
      : "-",
  },
  {
    title: 'Observação',
    get: (c: PaymentDetailDTO) => c.observation,
  },
  {
    title: 'Data de criação',
    get: (c: PaymentDetailDTO) => new Date(c.createdAt).toLocaleDateString(),
    
  },
  {
    title: 'Data de atualização',
    get: (c: PaymentDetailDTO) => c.updatedAt ? 
      new Date(c.updatedAt).toLocaleDateString() 
      : "-",
  },
]