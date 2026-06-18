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
import { 
  useMutationPatchPaymentInstallment 
} from "@/features/payment/api/mutationUpdatePaymentInstallment";
import { optionsQueryListPaymentMethods } from "@/api/queryListPaymentMethods";
import InstallmentDetail from "@/features/payment/components/InstallmentDetail";
import ModalInstallmentToPay from "@/features/payment/components/ModalInstallmentToPay";
import HeaderPage from "@/components/HeaderPage";
import ToastContainer from "@/components/Toast";

import { type PaymentInstallment } from '@shared/types/paymentInstallments'


export default function PaymentDetails() {

  const { id } = useParams();

  const [currentPayment, setCurrentPayment] = useState<PaymentInstallment>();

  const [openToast, setOpenToast] = useState("")
  const [modalPaymentToPay, setModalPaymentToPay] = useState(false);

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

  function executeActionAfterRequest(result: string) {
    setOpenToast(result);
    if (result === "success") {
      setTimeout(() => {
        setModalPaymentToPay(false);
        queryClient.invalidateQueries({
          queryKey: ['payment-installments', id]
        })
      }, 5000);
    }
  }

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

  function handleClickSendPaidInstallment(current: PaymentInstallment) {
    setCurrentPayment(current)
    setModalPaymentToPay(true)
  }
  
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
                    paymentInstallment.installment % 2 == 0 ? "secondInstallment" : undefined
                  } 
                  onClickUpdatePayment={(data) => mutationPatchInstallment.mutate(data)}
                  onClickSendPaidData={(id) => handleClickSendPaidInstallment(id)}
                  />
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

      { currentPayment && (
        <ModalInstallmentToPay
          open={modalPaymentToPay}
          installment={currentPayment}
          onSubmitPaidAt={(action) => executeActionAfterRequest(action)}
          handleClose={() => setModalPaymentToPay(false)}
        />
      ) }
    </>
  )
}