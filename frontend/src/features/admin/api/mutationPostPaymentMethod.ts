import { 
  useMutation, 
  type UseMutationOptions 
} from '@tanstack/react-query'

import { api } from '@/api/axios'

import type { PaymentMethodCreateDTO } from '@shared/types/paymentMethod'


async function postPaymentMethod(
  payload: PaymentMethodCreateDTO
): Promise<void> {
  const { data } = await api.post(`/payment/method`, payload)
  return data
}

export function useMutationPostPaymentMethod(
  options?: UseMutationOptions<void, Error, PaymentMethodCreateDTO>
) {
  return useMutation({
    mutationFn: postPaymentMethod,
    ...options,
  })
}