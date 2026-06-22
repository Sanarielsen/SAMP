import { useState } from "react";
import { useNavigate } from "react-router";
import { 
  useQuery, 
  useQueryClient
} from "@tanstack/react-query";

import { 
  Box, 
  Button, 
  Grid, 
  TextField, 
  Typography 
} from "@mui/material";

import { useAuth } from "@/auth/AuthProvider";
import { useMutationChangeStatusClient } from "@/features/client/api/mutationPatchChangeStatusClient";
import { optionsQueryClient } from "@/api/queryClients";
import DataTableColumnsClient from "@/features/client/components/DataTableColumnsClient";
import ModalClientDetails from "@/features/client/components/ModalClientDetails";
import DataTable from "@/components/DataTable";
import ModalConfirmation from "@/components/ModalConfirmation";
import ToastContainer from "@/components/Toast"
import type { ClientDetails } from "@/features/client/types/clients";
import { clientFields } from "@/features/client/utils/getRowDetailClient";


export default function ClientPage() {
  
  const navigate = useNavigate();
  const { getUserId } = useAuth();

  const userId = getUserId()

  const [searchBar, setSearchBar] = useState("");
  const [searchApplied, setSearchApplied] = useState("")
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
    refetch,
  } = useQuery(
    optionsQueryClient(String(userId), searchApplied)
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

  const handleDelete = (client: ClientDetails) => {
    setClientClicked(client)
    setOpenModalConfirmation(true)
  };

  function handleDeactivateClient(action: boolean){
    
    setOpenModalConfirmation(false)
    if (!action || !clientClicked) return
    
    mutationChangeStatusClient.mutate({
      id: clientClicked.id,
      isActivated: !clientClicked.isActivated,
    })

    refetch()
  }

  const stateQuery =
    isSuccess ? "SUCCESS" : 
    isLoading ? "LOADING" :
    isError ? "ERROR" : "IDLE";

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
          <Grid 
            size={{ xs: 12, md: 6 }}
            sx={{ pl: 2 }}
          >
            <Typography variant="h4" component="h1">
              Listagem de clientes
            </Typography>
          </Grid>
          <Grid 
            size={{ xs: 12, md: 6 }}
            sx={{
              pr: 2, textAlign: { xs: "center", md: "right" }
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
          <TextField
            label="Pesquisa na listagem de clientes"
            value={searchBar}
            onChange={(e) => setSearchBar(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setSearchApplied(searchBar)
                queryClient.invalidateQueries({ queryKey: ['clients'] })
              }
            }}
            fullWidth
          />
        </Box>

        <Box component="section" sx={{ p: 2}}>
          <DataTable
            state={stateQuery}
            rows={listClients ?? []}
            columns={DataTableColumnsClient({
              onClickUpdateItem: (id) => navigate(`/cliente/${id}`),
              onClickSeeItem: (current) => navigate(`/cliente/${current.id}/detalhes`), 
              onClickDeleteItem: (current) => handleDelete(current),
            })}
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