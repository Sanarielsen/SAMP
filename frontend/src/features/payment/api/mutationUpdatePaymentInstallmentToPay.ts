import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'
import type { PaymentInstallmentProof } from '@shared/types/paymentInstallments';


async function updatePaymentInstallmentToPay(
  payload: PaymentInstallmentProof
): Promise<void> {
  const { data } = await api.patch(`/payment/installment/${payload.id}/paid`, payload)
  
  return data
}

export function useMutationUpdatePaymentInstallmentToPay(
  options?: UseMutationOptions<void, Error, PaymentInstallmentProof>
) {
  return useMutation({
    mutationFn: updatePaymentInstallmentToPay,
    ...options,
  })
}
