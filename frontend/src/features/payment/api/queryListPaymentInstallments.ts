import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

export function optionsQueryListPaymentInstallments(paymentId: string) { 
  return queryOptions({
    queryKey: ["payment-installments", paymentId],
    enabled: !!paymentId,
    queryFn: async () => {
      const { data } = await api.get(`/payment/${paymentId}/installments`)

      return data
    },
  })
}