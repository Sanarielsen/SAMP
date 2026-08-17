import { queryOptions } from "@tanstack/react-query"

import { api } from "@/api/axios"

import type { OptionsControlledBox } from "@shared/types/values"


export function optionsQueryListPaymentMethodOptions() { 
  return queryOptions({
    queryKey: ["payment-method-as-options"],

    queryFn: async () => {
      const { data } = await api.get<OptionsControlledBox[]>(`/payment/method/options`)

      return data
    },
  })
}
