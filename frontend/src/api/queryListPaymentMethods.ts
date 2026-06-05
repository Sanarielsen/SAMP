import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

import { type PaymentMethod } from "@shared/types/paymentMethod"
import { type OptionsControlledBox } from "@shared/types/values"

export function optionsQueryListPaymentMethods() { 
  return queryOptions({
    queryKey: ["payment-methods"],
    queryFn: async () => {
      const { data } = await api.get<PaymentMethod[]>(`/payment/methods`)

      //Should be transfer to back-end ASAP
      const formattedPaymentMethods: OptionsControlledBox[] = data.map(
        paymentMethods => ({
          label: paymentMethods.name,
          value: paymentMethods.id,
        }),
      )

      return formattedPaymentMethods
    },
  })
}