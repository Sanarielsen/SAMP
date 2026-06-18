import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'


export type UpdatePaymentInstallmentToPayPayload = {
  id: string,
  paidAt: string | null
}

async function updatePaymentInstallmentToPay({
  id, paidAt
}: UpdatePaymentInstallmentToPayPayload): Promise<void> {
  const { data } = await api.patch(`/payment/installment/${id}/paid`, { paidAt })

  return data
}

export function useMutationUpdatePaymentInstallmentToPay(
  options?: UseMutationOptions<void, Error, UpdatePaymentInstallmentToPayPayload>
) {
  return useMutation({
    mutationFn: updatePaymentInstallmentToPay,
    ...options,
  })
}