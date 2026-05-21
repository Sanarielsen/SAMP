import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";

import { optionsQueryClient } from "@/features/representative/api/listRepresentatives";
import { useMutationDeleteRepresentative } from "@/features/representative/api/mutationDeleteRepresentative";
import { representativeFields } from "@/features/representative/utils/getRowDetailRepresentative";
import DataTableColumnsRepresentative from "@/features/representative/components/DataTableColumnsRepresentatives";
import ModalRepresentativeDetails from "@/features/representative/components/ModalRepresentativeDetails";
import DataTable from "@/components/DataTable";
import ModalConfirmation from "@/components/ModalConfirmation";
import ToastContainer from "@/components/Toast";

import type { RepresentativeDetailsDTO } from "@shared/types/representative";


export default function RepresentativePage() {

  const [searchBar, setSearchBar] = useState("");
  const [searchApplied, setSearchApplied] = useState("")
  const [representativeClicked, setRepresentativeClicked] = useState<RepresentativeDetailsDTO>();
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false)
  const [openToast, setOpenToast] = useState("")

  const { 
    data: listRepresentatives,
    isError,
    isSuccess, 
    isLoading,
    refetch
  } = useQuery(
    optionsQueryClient(searchApplied)
  )

  const mutationChangeStatusClient =
    useMutationDeleteRepresentative({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['representatives'] })
      setOpenToast("success"); 
    },
    onError: () => {
      setOpenToast("error"); 
    },
  })

  const navigate = useNavigate();

  const queryClient = useQueryClient()

  const stateQuery = 
    isSuccess ? "SUCCESS" : 
    isLoading ? "LOADING" :
    isError ? "ERROR" : "IDLE";

  const handleView = (representative: RepresentativeDetailsDTO) => {
    setRepresentativeClicked(representative);
    setOpenModalDetails(true);
  };

  const handleDelete = (representative: RepresentativeDetailsDTO) => {
    setRepresentativeClicked(representative)
    setOpenModalConfirmation(true)
  };

  function handleDeactivateClient(action: boolean){

    setOpenModalConfirmation(false)
    if (!action || !representativeClicked) return
    
    mutationChangeStatusClient.mutate({
      id: representativeClicked.id
    })

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
              Listagem de representantes
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
              onClick={() => navigate('/representante')}
            >
              Inserir Novo Representante
            </Button>
          </Grid> 
        </Grid>

        <Box component="section" sx={{ p: 2}}>
          <TextField
            label="Pesquisa na listagem de representantes"
            value={searchBar}
            onChange={(e) => setSearchBar(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setSearchApplied(searchBar)
                queryClient.invalidateQueries({ queryKey: ['representatives'] })
              }
            }}
            fullWidth
          />
        </Box>

        <Box component="section" sx={{ p: 2}}>
          <DataTable
            state={stateQuery}
            rows={listRepresentatives}
            columns={DataTableColumnsRepresentative({
              onClickUpdateItem: (id) => navigate(`/representante/${id}`),
              onClickSeeItem: (current) => handleView(current), 
              onClickDeleteItem: (current) => handleDelete(current)
            })}
          />
        </Box>
      </Box>

      <ToastContainer
        open={openToast === "success"}
        message="Representante desativado com sucesso."
        severity="success"
        onClose={() => setOpenToast("")}
      />

      <ToastContainer
        open={openToast === "error"}
        message="Ocorreu um erro ao desativar esse representante."
        severity="error"
        onClose={() => setOpenToast("")}
      />

      {representativeClicked && (
        <ModalRepresentativeDetails 
          open={openModalDetails}
          representative={representativeClicked}
          fields={representativeFields}
          handleClose={() => setOpenModalDetails(false)}
        />
      )}

      <ModalConfirmation
        open={openModalConfirmation}
        title={"Desativar o representante atual"}
        description={`Tem certeza que gostaria de desativar o representante atual? Essa operacão não é inversivel.`}
        handleClose={() => setOpenModalConfirmation(false)}
        handleAnswer={handleDeactivateClient}
      />
    </>
  )
}