import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'

import type { CreatePaymentWithInstallmentsDTO } from '@shared/types/payment'


export type OrderPostPaymentWithInstallmentPayload = {
  id: string
  payload: CreatePaymentWithInstallmentsDTO
}

async function postOrderPaymentWithInstallments({
  id, payload
}: OrderPostPaymentWithInstallmentPayload): Promise<void> {
  const { data } = await api.post(`/order/${id}/payment/installments`, payload)

  return data
}

export function useMutationPostPaymentWithInstallments(
  options?: UseMutationOptions<void, Error, OrderPostPaymentWithInstallmentPayload>
) {
  return useMutation({
    mutationFn: postOrderPaymentWithInstallments,
    ...options,
  })
}