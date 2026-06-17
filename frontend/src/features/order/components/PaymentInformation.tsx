import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { 
  Button, 
  Grid
} from "@mui/material";

import { optionsQueryListOrderPayments } from "@/features/order/api/queryListPayments";
import DataTableColumnsPayments from "@/features/order/components/DataTableColumnsPayments";
import ModalPaymentDetails from "@/features/order/components/ModalPaymentDetails";
import DataTable from "@/components/DataTable";
import HeaderPage from "@/components/HeaderPage";
import { paymentFields } from "@/features/order/utils/getRowDetailPayment";

import type { PaymentDetailDTO } from "@shared/types/payment";


export default function PaymentInformation() {

  const navigate = useNavigate();
  const { id: orderId } = useParams();

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

  const stateQuery = isSuccess ? "SUCCESS" : 
    isLoading ? "LOADING" :
    isError ? "ERROR" : "IDLE";

  const handleView = (payment: PaymentDetailDTO) => {
    setPaymentClicked(payment);
    setOpenModalDetails(true);
  };

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
              onClickDeleteItem: (current) => console.log("Deleta esse item: ", current),
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
    </>
  )
}