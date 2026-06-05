import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { api } from '@/api/axios'


export type UpdatePaymentInstallmentToPayPayload = {
  id: string,
  paidAt: string
  file: File | undefined,
}

async function updatePaymentInstallmentToPay({
  id,
  paidAt,
  file,
}: UpdatePaymentInstallmentToPayPayload) {
  const formData = new FormData();

  formData.append("paidAt", paidAt);

  if (file) {
    formData.append("proofPayment", file);
  }

  const { data } = await api.patch(
    `/payment/installment/${id}/paid`,
    formData
  );

  return data;
}

export function useMutationUpdatePaymentInstallmentToPay(
  options?: UseMutationOptions<void, Error, UpdatePaymentInstallmentToPayPayload>
) {
  return useMutation({
    mutationFn: updatePaymentInstallmentToPay,
    ...options,
  })
}