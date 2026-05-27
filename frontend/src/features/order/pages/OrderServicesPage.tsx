import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { optionsQueryListOrders } from "../api/queryListOrders";

import DataTable from "@/components/DataTable";
import DataTableColumnsOrder from "@/features/order/components/DataTableColumnsOrders";
import ToastContainer from "@/components/Toast";
import ModalConfirmation from "@/components/ModalConfirmation";
import { useMutationDeleteOrder } from "../api/mutationDeleteOrder";

interface OrderDetailDTO {
  id:           string

  clientId?:    string
  orderTypeId?: number
  observation?: string
  eventDate?:   Date

  createdAt:    Date
  updatedAt:    Date | null
  deletedAt:    Date | null
}

export default function OrderServicesPage() {

  const navigate = useNavigate();

  const queryClient = useQueryClient()

  const [searchBar, setSearchBar] = useState("");
  const [searchApplied, setSearchApplied] = useState("")
  const [orderClicked, setOrderClicked] = useState<OrderDetailDTO>();
  // const [openModalOrder, setOpenModalOrder] = useState(false);
  // const [openModalDetails, setOpenModalDetails] = useState(false);
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false)
  const [openToast, setOpenToast] = useState("")

  const { 
    data: listOrders,
    isError,
    isSuccess, 
    isLoading,
    refetch
  } = useQuery(
    optionsQueryListOrders(searchApplied)
  )

  const mutationDeleteOrder =
    useMutationDeleteOrder({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      setOpenToast("success"); 
    },
    onError: () => {
      setOpenToast("error"); 
    },
  })

  const stateQuery = 
    isSuccess ? "SUCCESS" : 
    isLoading ? "LOADING" :
    isError ? "ERROR" : "IDLE";

  const handleView = (order: OrderDetailDTO) => {
    setOrderClicked(order);
    // setOpenModalDetails(true);
  };

  const handleDelete = (order: OrderDetailDTO) => {
    setOrderClicked(order)
    setOpenModalConfirmation(true)
  };

  function handleDeactivateClient(action: boolean){

    setOpenModalConfirmation(false)
    if (!action || !orderClicked) return
    
    mutationDeleteOrder.mutate(orderClicked.id)

    refetch()
  }

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
              Listagem de processos
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
              onClick={() => navigate('/os')}
            >
              Cadastrar novo processo
            </Button>
          </Grid>

        </Grid>

        <Box component="section" sx={{ p: 2}}>
          <TextField
            label="Pesquisa na listagem de processos"
            value={searchBar}
            onChange={(e) => setSearchBar(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setSearchApplied(searchBar)
                queryClient.invalidateQueries({ queryKey: ['orders'] })
              }
            }}
            fullWidth
          />
        </Box>

        <Box component="section" sx={{ p: 2}}>
          <DataTable
            state={stateQuery}
            rows={listOrders}
            columns={DataTableColumnsOrder({
              onClickUpdateItem: (id) => navigate(`/os/${id}`),
              onClickSeeItem: (current) => handleView(current), 
              onClickDeleteItem: (current) => handleDelete(current),
            })}
          />
        </Box>
      </Box>

      <ToastContainer
        open={openToast === "success"}
        message="Ordem de servico desativada com sucesso."
        severity="success"
        onClose={() => setOpenToast("")}
      />

      {orderClicked && (
        <>
          {/* <ModalRepresentativeDetails 
            open={openModalDetails}
            representative={orderClicked}
            fields={representativeFields}
            handleClose={() => setOpenModalDetails(false)}
          />

          <ModalListClientsOnRepresentative 
            open={openModalClients}
            representative={orderClicked}
            handleClose={() => setOpenModalClients(false)}
          /> */}
        </>
      )}

      <ToastContainer
        open={openToast === "error"}
        message="Ocorreu um erro ao desativar essa ordem de servico."
        severity="error"
        onClose={() => setOpenToast("")}
      />

      <ModalConfirmation
        open={openModalConfirmation}
        title={"Desativar a ordem de servico atual"}
        description={`Tem certeza que gostaria de desativar o O.S atual? Essa operacão não é inversivel.`}
        handleClose={() => setOpenModalConfirmation(false)}
        handleAnswer={handleDeactivateClient}
      />
    </>
  )
}