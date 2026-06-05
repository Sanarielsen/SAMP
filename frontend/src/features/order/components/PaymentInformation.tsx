import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { 
  Button, 
  Grid
} from "@mui/material";

import { optionsQueryListOrderPayments } from "@/features/order/api/queryListPayments";
import { useMutationDeletePayment } from "@/features/order/api/mutationDeletePayment";
import DataTableColumnsPayments from "@/features/order/components/DataTableColumnsPayments";
import ModalPaymentDetails from "@/features/order/components/ModalPaymentDetails";
import DataTable from "@/components/DataTable";
import HeaderPage from "@/components/HeaderPage";
import ModalConfirmation from "@/components/ModalConfirmation";
import ToastContainer from "@/components/Toast";
import { paymentFields } from "@/features/order/utils/getRowDetailPayment";

import type { PaymentDetailDTO } from "@shared/types/payment";


export default function PaymentInformation() {

  const navigate = useNavigate();
  const { id: orderId } = useParams();
  const queryClient = useQueryClient();

  const [openToast, setOpenToast] = useState("")
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false)
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [paymentClicked, setPaymentClicked] = useState<PaymentDetailDTO>();

  const { 
    data: listOrderPayments,
    isError,
    isSuccess, 
    isLoading,
  } = useQuery(
      optionsQueryListOrderPayments(orderId!, !!orderId) 
  )

  const mutationDeletePayment =
    useMutationDeletePayment({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order-payments'] })
      setOpenToast("success"); 
    },
    onError: () => {
      setOpenToast("error"); 
    },
  })

  const stateQuery = isSuccess ? "SUCCESS" : 
    isLoading ? "LOADING" :
    isError ? "ERROR" : "IDLE";

  const handleView = (payment: PaymentDetailDTO) => {
    setPaymentClicked(payment);
    setOpenModalDetails(true);
  };

  function handleDelete(payment: PaymentDetailDTO)  {
    setPaymentClicked(payment)
    setOpenModalConfirmation(true)
  }

  function handleDeactivatePayment(action: boolean){

    setOpenModalConfirmation(false)
    if (!action || !paymentClicked) return
    
    mutationDeletePayment.mutate(paymentClicked.id)

    queryClient.invalidateQueries({ queryKey: ['order-payments'] })
  }

  return (
    <>
      <HeaderPage title="Pagamentos">
        <Button
          type="button"
          variant="contained"
          sx={{ 
            width: { xs: "100%", md: "auto" },
            "&:hover": {
              backgroundColor: "#7A3000",
            },
          }}
          color="secondary"
          onClick={() => navigate(`/os/detalhes/${orderId}/pagamento`)}
        >
          Adicionar
        </Button>
      </HeaderPage>

      <Grid
        container 
        spacing={2}
        sx={{ p: 2 }}
      >
        <Grid size={{ xs: 12 }}>
          <DataTable
            state={stateQuery}
            rows={listOrderPayments}
            columns={DataTableColumnsPayments({
              onClickUpdateItem: (id) => navigate(`/pagamento/${id}/parcelas`),
              onClickSeeItem: (current) => handleView(current), 
              onClickDeleteItem: (current) => handleDelete(current),
            })}
          />
        </Grid>
      </Grid>

      {paymentClicked && (
        <ModalPaymentDetails 
          open={openModalDetails}
          payment={paymentClicked}
          fields={paymentFields}
          handleClose={() => setOpenModalDetails(false)}
        />
      )}

      <ModalConfirmation
        open={openModalConfirmation}
        title={"Desativar o pagamento atual"}
        description={`Tem certeza que gostaria de desativar o pagamento atual? Essa operacão não é inversivel.`}
        handleClose={() => setOpenModalConfirmation(false)}
        handleAnswer={handleDeactivatePayment}
      />

      <ToastContainer
        open={openToast === "success"}
        message="Pagamento desativado com sucesso."
        severity="success"
        onClose={() => setOpenToast("")}
      />

      <ToastContainer
        open={openToast === "error"}
        message="Ocorreu um erro ao desativar esse pagamento."
        severity="error"
        onClose={() => setOpenToast("")}
      />
    </>
  )
}