import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { 
  Button, 
  Grid
} from "@mui/material";

import { optionsQueryListOrderPayments } from "@/features/order/api/queryListPayments";
import DataTableColumnsPayments from "@/features/order/components/DataTableColumnsPayments";
import DataTable from "@/components/DataTable";
import HeaderPage from "@/components/HeaderPage";


export default function PaymentInformation() {

  const navigate = useNavigate();
  const { id: orderId } = useParams();

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
              onClickSeeItem: (current) => console.log("Visualiza esse item: ", current), 
              onClickDeleteItem: (current) => console.log("Deleta esse item: ", current),
            })}
          />
        </Grid>
      </Grid>
    </>
  )
}