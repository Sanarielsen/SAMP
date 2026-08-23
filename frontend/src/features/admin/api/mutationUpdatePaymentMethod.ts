import { 
  useMutation, 
  type UseMutationOptions 
} from '@tanstack/react-query'

import { api } from '@/api/axios'

import type { PaymentMethodUpdateDTO } from '@shared/types/paymentMethod'


async function patchPaymentMethod(
  payload: PaymentMethodUpdateDTO
): Promise<void> {
  const { data } = await api.post(`/payment/method/${payload.id}`, payload)
  return data
}

export function useMutationPatchPaymentMethod(
  options?: UseMutationOptions<void, Error, PaymentMethodUpdateDTO>
) {
  return useMutation({
    mutationFn: patchPaymentMethod,
    ...options,
  })
}