import { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { 
  Box, 
  Grid 
} from "@mui/material";

import { 
  optionsQueryListPaymentInstallments 
} from "@/features/payment/api/queryListPaymentInstallments";
import InstallmentDetail from "@/features/payment/components/InstallmentDetail";
import HeaderPage from "@/components/HeaderPage";

import { type PaymentInstallment } from '@shared/types/paymentInstallments'
import { useMutationPatchPaymentInstallment } from "@/features/payment/api/mutationUpdatePaymentInstallment";
import ToastContainer from "@/components/Toast";

export default function PaymentDetails() {

  const { id } = useParams();

  const [openToast, setOpenToast] = useState("")

  const queryClient = useQueryClient();

  const { 
    data: listPaymentInstallments,
    isSuccess
  } = useQuery(
    optionsQueryListPaymentInstallments(id!)
  )

  const mutationPatchInstallment =
    useMutationPatchPaymentInstallment({
      onSuccess: () => {
        setOpenToast("success")
        queryClient.invalidateQueries({
          queryKey: ['payment-installments', id]
        })
      },
      onError: () => {
        setOpenToast("error")
      },
  })
  
  return (
    <>
      <HeaderPage 
        title="Gerenciar as parcelas deste pagamento:"
      />
       
      <Box component="section" sx={{
        p: 4, 
        display: 'flex',
        flexDirection: "column",
      }}>
        { isSuccess && 
          listPaymentInstallments.map( ( paymentInstallment: PaymentInstallment ) => {
            return (
              <Grid key={paymentInstallment.id} >
                <InstallmentDetail 
                  currentPayment={paymentInstallment}
                  color={
                    paymentInstallment.installment % 2 == 0 ? "grey.100" : undefined
                  } 
                  onClickUpdatePayment={(data) => {
                    console.log('Sending to API:', { ...data, id: data.id });
                    mutationPatchInstallment.mutate({ ...data });
                  }}/>
              </Grid>
            )
          } 
        )}
      </Box>

      <ToastContainer
        open={openToast === "success"}
        message="Parcela atualizada com sucesso."
        severity="success"
        onClose={() => setOpenToast("")}
      />

      <ToastContainer
        open={openToast === "error"}
        message="Ocorreu um erro ao atualizar essa parcela."
        severity="error"
        onClose={() => setOpenToast("")}
      />
    </>
  )
}