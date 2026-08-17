import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

import type { PaymentMethod } from "@shared/types/paymentMethod"


export function optionsQueryGetPaymentMethod(id: number, isEnabled: boolean) { 
  return queryOptions({
    queryKey: ["payment-method", id],
    enabled: !!id && isEnabled,
    queryFn: async () => {
      const { data } = await api.get<PaymentMethod | null>(`/payment/method/${id}`)

      return data
    },
  })
}