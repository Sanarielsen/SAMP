import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { Button, Grid } from "@mui/material";

import { optionsQueryGetOrderDetails } from "@/features/order/api/queryGetOrderDetails";

import BoxError from "@/components/BoxError";
import BoxLoading from "@/components/BoxLoading";
import GroupText from "@/components/GroupText";
import GroupTextDate from "@/components/GroupTextDate";
import HeaderPage from "@/components/HeaderPage";

export default function OrderInformation() {

  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: currentOrder,
    isError,
    isSuccess,
    isLoading,
  } = useQuery(optionsQueryGetOrderDetails(id!, true))

  if (isError) {
    return (
      <BoxError description="Erro ao carregar os dados da oferta atual. Tente novamente." />
    )
  }

  if (isLoading) {
    return (
      <BoxLoading description="Carregando os dados da oferta atual, aguarde..." />
    )
  }

  if (isSuccess) {
    return (
      <>
        <HeaderPage title="O.S">
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
            onClick={() => navigate(`/os/${id}`)}
          >
            Atualizar
          </Button>
        </HeaderPage>

        <Grid
          container 
          spacing={2}
          sx={{
            p: 2
          }}
        >
          <Grid size={{ xs: 6, md: 6, lg: 3 }}>
            <GroupText 
              title="Título"
              value={currentOrder.orderTypeTitle}
              observation={currentOrder.orderTypeObservation}
            />
          </Grid>

          <Grid size={{ xs: 6, md: 6, lg: 3 }}>
            <GroupText 
              title="Descricão"
              value={currentOrder.description}
              observation={currentOrder.observation}
            />
          </Grid>

          <Grid size={{ xs: 6, md: 6, lg: 3 }}>
            <GroupText 
              title="Solicitado para:"
              value={currentOrder.clientName}
            />
          </Grid>

          <Grid size={{ xs: 6, md: 6, lg: 3}}>
            <GroupTextDate
              title="Prazo"
              value={currentOrder.eventDate}
            />
          </Grid>
        </Grid>
      </>
    )
  }
}