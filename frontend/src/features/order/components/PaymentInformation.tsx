import { useNavigate, useParams } from "react-router";

import { Button, Grid } from "@mui/material";

import DataTableColumnsPayments from "@/features/order/components/DataTableColumnsPayments";
import DataTable from "@/components/DataTable";
import HeaderPage from "@/components/HeaderPage";

const listPayments = [
  {
    id: "order-id-1",
    totalInstallments: 3,
    totalAmountInCents: 10000
  },
  {
    id: "order-id-2",
    totalInstallments: 5,
    totalAmountInCents: 32000
  },
  {
    id: "order-id-3",
    totalInstallments: 1,
    totalAmountInCents: 5000
  },
]

export default function PaymentInformation() {

  const navigate = useNavigate();
  const { id } = useParams();

    const stateQuery = "SUCCESS"
    // isSuccess ? "SUCCESS" : 
    // isLoading ? "LOADING" :
    // isError ? "ERROR" : "IDLE";

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
          onClick={() => navigate(`/os/detalhes/${id}/pagamento`)}
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
            rows={listPayments}
            columns={DataTableColumnsPayments({
              onClickUpdateItem: (id) => console.log("Atualiza esse item: ", id),
              onClickSeeItem: (current) => console.log("Visualiza esse item: ", current), 
              onClickDeleteItem: (current) => console.log("Deleta esse item: ", current),
            })}
          />
        </Grid>
      </Grid>
    </>
  )
}