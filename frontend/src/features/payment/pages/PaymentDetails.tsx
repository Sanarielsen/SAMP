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
import { optionsQueryListPaymentMethods } from "@/api/queryListPaymentMethods";


export default function PaymentDetails() {

  const { id } = useParams();

  const [openToast, setOpenToast] = useState("")

  const queryClient = useQueryClient();

  const { 
    data: listPaymentMethods,
    isSuccess: isSuccessMethods,
  } = useQuery(
    optionsQueryListPaymentMethods()
  )

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
                  listPaymentMethods={isSuccessMethods ? listPaymentMethods : []}
                  color={
                    paymentInstallment.installment % 2 == 0 ? "grey.100" : undefined
                  } 
                  onClickUpdatePayment={(data) => mutationPatchInstallment.mutate(data)}/>
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