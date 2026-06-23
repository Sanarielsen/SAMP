import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { 
  Button, 
  Grid
} from "@mui/material";

import { optionsQueryGetClient } from "@/features/client/api/queryGetClient";
import BoxError from "@/components/BoxError";
import BoxLoading from "@/components/BoxLoading";
import HeaderPage from "@/components/HeaderPage";
import GroupText from "@/components/GroupText";
import { formatAsVisualDate } from "@/utils/formatAsAVisualDate";
import { formatDocument } from "@/utils/formatDocument";


export default function ClientInformation() {

  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: currentClient,
    isError,
    isSuccess,
    isLoading,
  } = useQuery(optionsQueryGetClient(id!))

  if (isError) {
    return (
      <BoxError description="Erro ao carregar os dados do cliente. Tente novamente." />
    )
  }

  if (isLoading) {
    return (
      <BoxLoading description="Carregando os dados do cliente, aguarde..." />
    )
  }

  if (isSuccess) {

    const lastUpdate = 
      currentClient.updatedAt ? 
        formatAsVisualDate(String(currentClient.updatedAt)) : 
          formatAsVisualDate(String(currentClient.createdAt))

    return (
      <>
        <HeaderPage title="Cliente">
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
            onClick={() => navigate(`/cliente/${id}`)}
          >
            Atualizar
          </Button>
        </HeaderPage>

        <Grid
          container 
          spacing={4}
          sx={{ p: 2 }}
        >
          <Grid size={{ xs: 6, sm: 4, xl: 3 }}>
            <GroupText
              title="Razao social"
              value={currentClient.legalName}
            />
          </Grid>

          <Grid size={{ xs: 6, sm: 4, xl: 3 }}>
            <GroupText 
              title="Nome fantasia"
              value={currentClient.tradeName}
            />
          </Grid>

          <Grid size={{ xs: 6, sm: 4, xl: 3 }}>
            <GroupText 
              title="Nome fantasia"
              value={formatDocument(currentClient.protocol)}
            />
          </Grid>

          <Grid size={{ xs: 6, md: 6, lg: 3 }}>
            <GroupText 
              title="Data de fundação"
              value={new Date(currentClient.dataFundation).toLocaleDateString("pt-BR")}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <GroupText 
              title="Endereço"
              value={currentClient.locationAddress}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <GroupText 
              title="Endereço de correspondencia"
              value={currentClient.correspondenceAddress}
            />
          </Grid>

          <Grid size={{ xs: 6, sm: 4, xl: 3 }}>
            <GroupText 
              title="Nome do contato"
              value={currentClient.nameContact}
            />
          </Grid>

          <Grid size={{ xs: 6, sm: 4, xl: 3 }}>
            <GroupText 
              title="Número do contato"
              value={currentClient.numberContact}
            />
          </Grid>

          <Grid size={{ xs: 6, sm: 4, xl: 3 }}>
            <GroupText 
              title="Criado/Atualizado em"
              value={lastUpdate}
            />
          </Grid>
        </Grid>
      </>
    )
  }
}