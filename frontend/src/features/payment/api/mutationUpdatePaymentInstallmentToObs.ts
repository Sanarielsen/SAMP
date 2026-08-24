import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'

import type { PaymentInstallmentObservation } from '@shared/types/paymentInstallments'


async function patchPaymentInstallmentToObs(
  payload: PaymentInstallmentObservation
): Promise<void> {
  const { data } = await api.patch(`/payment/installment/${payload.id}/observation`, payload)
  return data
}

export function useMutationPatchPaymentInstallmentToObs(
  options?: UseMutationOptions<void, Error, PaymentInstallmentObservation>
) {
  return useMutation({
    mutationFn: patchPaymentInstallmentToObs,
    ...options,
  })
}