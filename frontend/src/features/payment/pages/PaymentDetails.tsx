import { useState } from "react";

import { useParams } from "react-router";
import { 
  useQuery, 
  useQueryClient
} from "@tanstack/react-query";
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
import { optionsQueryListPaymentMethodOptions } from "@/api/queryListPaymentMethods";
import ModalInstallmentToObs from "@/features/payment/components/ModalInstallmentToObs";
import InstallmentDetail from "@/features/payment/components/InstallmentDetail";
import ModalInstallmentToPay from "@/features/payment/components/ModalInstallmentToPay";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import HeaderPage from "@/components/HeaderPage";
import ToastContainer from "@/components/Toast";

import { type PaymentInstallment } from '@shared/types/paymentInstallment'


export default function PaymentDetails() {

  const { id } = useParams();

  const [currentPayment, setCurrentPayment] = useState<PaymentInstallment>();

  const [openToast, setOpenToast] = useState("")
  const [modalPaymentToObs, setModalPaymentToObs] = useState(false);
  const [modalPaymentToPay, setModalPaymentToPay] = useState(false);

  const queryClient = useQueryClient();

  const { 
    data: listPaymentMethodOptions,
    isSuccess: isSuccessMethodOptions,
  } = useQuery(
    optionsQueryListPaymentMethodOptions()
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
        setModalPaymentToObs(false);
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
      },
      onError: () => {
        setOpenToast("error")
      },
  })

  function handleClickSendPaidInstallment(current: PaymentInstallment) {
    setCurrentPayment(current)
    setModalPaymentToPay(true)
  }

  function handleClickSendObservationInstallment(current: PaymentInstallment) {
    setCurrentPayment(current)
    setModalPaymentToObs(true)
  }
  
  return (
    <>
      <HeaderPage 
        title="Gerenciar as parcelas deste pagamento"
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
                  listPaymentMethods={isSuccessMethodOptions ? listPaymentMethodOptions : []}
                  color={
                    paymentInstallment.installment % 2 == 0 ? "secondInstallment" : undefined
                  } 
                  onClickUpdatePayment={(data) => mutationPatchInstallment.mutate(data)}
                  onClickUpdateObservation={(id) => handleClickSendObservationInstallment(id)}
                  onClickSendPaidData={(id) => handleClickSendPaidInstallment(id)}
                />
              </Grid>
            )
          } 
        )}
      </Box>

      <FullScreenLoader open={mutationPatchInstallment.isPending} />

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
        <>
          <ModalInstallmentToObs
            key={currentPayment?.id ?? "obs-modal"}
            open={modalPaymentToObs}
            installment={currentPayment}
            onSubmitObservation={(action) => executeActionAfterRequest(action)}
            handleClose={() => setModalPaymentToObs(false)}
          />

          <ModalInstallmentToPay
            open={modalPaymentToPay}
            installment={currentPayment}
            onSubmitPaidAt={(action) => executeActionAfterRequest(action)}
            handleClose={() => setModalPaymentToPay(false)}
          />
        </>

      ) }
    </>
  )
}