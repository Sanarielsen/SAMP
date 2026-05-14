import { 
  Box, 
  Button, 
  Grid, 
  IconButton, 
  Stack, 
  Tooltip, 
  Typography } from "@mui/material";
import { 
  GridDeleteIcon, 
  GridLoadIcon, 
  GridSearchIcon,
  type GridColDef 
} from "@mui/x-data-grid";
import { useNavigate } from "react-router";

import DataTable from "@/components/DataTable";
import SearchInput from "@/components/SearchInput";
import { MOCK_CLIENTS } from "@/features/client/utils/mockConstants"
import type { ClientDetails } from "@/features/client/types/clients";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { optionsQueryClient } from "../api/queryClients";
import { formatCPF } from "@/utils/formatCPF";
import { formatCNPJ } from "@/utils/formatCNPJ";
import { useAuth } from "@/auth/AuthProvider";
import { useState } from "react";
import ModalClientDetails from "../components/ModalClientDetails";
import { clientFields } from "../utils/getRowDetailClient";
import { useMutationChangeStatusClient } from "@/features/client/api/mutationPatchChangeStatusClient";
import ModalConfirmation from "@/components/ModalConfirmation";
import ToastContainer from "@/components/Toast"


export default function ClientPage() {
  
  const navigate = useNavigate();
  const { getUserId } = useAuth();

  const userId = getUserId()

  const [clientClicked, setClientClicked] = useState<ClientDetails>();
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false)
  const [openToast, setOpenToast] = useState("")

  const queryClient = useQueryClient()

  const { 
    data: listClients,  
    isError,
    isSuccess, 
    isLoading,
  } = useQuery(
    optionsQueryClient(String(userId))
  )

  const mutationChangeStatusClient =
    useMutationChangeStatusClient({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      setOpenToast("success"); 
    },
    onError: () => {
      setOpenToast("error"); 
    },
  })
  
  const handleView = (client: ClientDetails) => {
    setClientClicked(client);
    setOpenModalDetails(true);
  };

  const handleDelete = (client: ClientDetails) => {
    setClientClicked(client)
    setOpenModalConfirmation(true)
  };

  function handleDeactivateClient(){
    setOpenModalConfirmation(false)
    
    if (!clientClicked) return
    mutationChangeStatusClient.mutate({
      id: clientClicked.id,
      isActivated: !clientClicked.isActivated,
    })
  }

  const columns: GridColDef<ClientDetails>[] = [
    {
      field: "legalName",
      headerName: "Razao social",
      flex: 1,
    },
    {
      field: "protocol",
      headerName: "Protocolo",
      flex: 1,
      valueFormatter: (value: string) => {
        if (value.length === 11) {
          return formatCPF(value)
        }

        if (value.length === 14) {
          return formatCNPJ(value)
        }
      },
    },
    {
      field: "tradeName",
      headerName: "Nome Fantasia",
      flex: 1,
    },
    {
      field: "dataFundation",
      headerName: "Data de fundacão",
      flex: 1,
      valueFormatter: (value) => {
        if (!value) return "-"
        return new Date(value).toLocaleDateString("pt-BR")
      },
    },
    {
      field: "actions",
      headerName: "Ações",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <Stack 
          direction="row" 
          spacing={1} 
          sx={{
            height: "100%",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => handleView(params.row)}
          >
            <Tooltip title="Detalhes">
              <GridSearchIcon />
            </Tooltip>
          </IconButton>

          <IconButton
            onClick={() => navigate(`/cliente/${params.id}`)}
          >          
            <Tooltip title="Atualizar">
              <GridLoadIcon />
            </Tooltip>
          </IconButton>

          <IconButton
            onClick={() => handleDelete(params.row)}
          >
            <Tooltip title="Excluir">
              <GridDeleteIcon />
            </Tooltip>
          </IconButton>
        </Stack>
      ),
    }
  ];

  return (
    <>
      <Box component="section" sx={{ p: 2}}>
        <Grid 
          container 
          spacing={2} 
          sx={{
            textAlign: { xs: "center", md: "left" }
          }}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" component="h1">
              Listagem de clientes
            </Typography>
          </Grid>
          <Grid 
            size={{ xs: 12, md: 6 }}
            sx={{
              textAlign: { xs: "center", md: "right" }
            }}
          >
            <Button
              type="button"
              variant="contained"
              sx={{ width: { xs: "100%", md: "auto" }, }}
              onClick={() => navigate("/cliente")}
            >
              Inserir Novo cliente
            </Button>
          </Grid>        
        </Grid>

        <Box component="section" sx={{ p: 2}}>
          <SearchInput
            name="srhClients"
            label="Busque um cliente cadastrado pelo nome"
            data={MOCK_CLIENTS}
          />
        </Box>

        <Box component="section" sx={{ p: 2}}>
          <DataTable
            state={
              isSuccess ? "SUCCESS" : 
              isLoading ? "LOADING" :
              isError ? "ERROR" : "IDLE"
            }
            rows={listClients ?? []}
            columns={columns}
          />
        </Box>
      </Box>

      <ToastContainer
        open={openToast === "success"}
        message="Cliente desativado com sucesso."
        severity="success"
        onClose={() => setOpenToast("")}
      />

      <ToastContainer
        open={openToast === "error"}
        message="Ocorreu um erro ao desativar esse cliente."
        severity="error"
        onClose={() => setOpenToast("")}
      />

      {clientClicked && (
        <ModalClientDetails 
          open={openModalDetails}
          client={clientClicked}
          fields={clientFields}
          handleClose={() => setOpenModalDetails(false)}
        />
      )}

      <ModalConfirmation
        open={openModalConfirmation}
        title={"Desativar o cliente atual"}
        description={`Tem certeza que gostaria de desativar o cliente atual? Essa operacão não é inversivel.`}
        handleClose={() => setOpenModalConfirmation(false)}
        handleAnswer={handleDeactivateClient}
      />
      
    </>
  )
}