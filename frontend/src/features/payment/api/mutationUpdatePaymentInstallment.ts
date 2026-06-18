import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'

import type { UpdatePaymentInstallmentDTO } from '@shared/types/paymentInstallments'


export type PaymentInstallmentPatchPayload = UpdatePaymentInstallmentDTO 

async function patchPaymentInstallment(
  payload: PaymentInstallmentPatchPayload
): Promise<void> {
  const { data } = await api.patch(`/payment/installment/${payload.id}`, payload)
  console.log("Payload: ", payload)
  return data
}

export function useMutationPatchPaymentInstallment(
  options?: UseMutationOptions<void, Error, PaymentInstallmentPatchPayload>
) {
  return useMutation({
    mutationFn: patchPaymentInstallment,
    ...options,
  })
}