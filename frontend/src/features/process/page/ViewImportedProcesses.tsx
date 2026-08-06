import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { 
  Box, 
  Button, 
  TextField 
} from "@mui/material";

import { optionsQueryListProcessDetailsWithSearch } from "@/features/process/api/queryListProcessDetailsWithDetails";
// import { useMutationDeleteProcess } from "@/features/process/api/mutationDeleteProcess";
import DataTableImportedProcessColumns from "@/features/process/components/DataTableImportedProcessColumns";
import DataTable from "@/components/DataTable";
import HeaderPage from "@/components/HeaderPage";
import ModalConfirmation from "@/components/ModalConfirmation";
import ToastContainer from "@/components/Toast";


export default function ViewImportedProcesses() {

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [openToast, setOpenToast] = useState("");
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false);
  const [searchBar, setSearchBar] = useState("");
  const [searchApplied, setSearchApplied] = useState("")
  const [
    processIdClicked
    //,setProcessIdClicked
  ] = useState("");

  const { 
    data: listProcessesWithDetails,
    isSuccess,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    optionsQueryListProcessDetailsWithSearch(searchApplied)
  )

  // const mutationDeleteProcess =
  //   useMutationDeleteProcess({
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['publications'] })
  //     setOpenToast("success"); 
  //   },
  //   onError: () => {
  //     setOpenToast("error"); 
  //   },
  // })

  function handleDeletePublication(action: boolean){

    setOpenModalConfirmation(false)
    if (!action || !processIdClicked
    ) return
    
    // mutationDeleteProcess.mutate(
    //   processIdClicked
    // )

    refetch()
  }

  // function handleDelete(id: string) {
  //   setProcessIdClicked(id);
  //   setOpenModalConfirmation(true);
  // }

  //TODO: Current infracturure, its not possible to export the magazine. 
  //But when have a necessity to do it, explore this feature!
  // const optionsNewProcess = [
    
  //   {
  //     label: 'Adicionar publicacão integrada aos processos da importacao',
  //     value: 'automatica',
  //     onClickOption: () => navigate('/processo/automatico')
  //   },
  //   {
  //     label: 'Adicionar publicação manualmente',
  //     value: 'manual',
  //     onClickOption: () => navigate('/processos/publicacao')
  //   },
  // ]

  const stateQuery =
    isSuccess ? "SUCCESS" : 
    isLoading ? "LOADING" :
    isError ? "ERROR" : "IDLE";

  return (
    <>
      <Box component="section" sx={{ marginTop: 2 }}>
        <HeaderPage title="Listagem de processos"> 
          <Box
            component="div"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            <Button              
              type="button"
              variant="contained"
              fullWidth
              onClick={() => navigate('/processo')}
            >
              Cadastrar processo
            </Button>
          </Box>
        </HeaderPage>

        <Box component="section" sx={{ p: 2, px: 4 }}>
          <TextField
            label="Pesquisa na listagem de processos cadastrados"
            value={searchBar}
            onChange={(e) => setSearchBar(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setSearchApplied(searchBar)
                queryClient.invalidateQueries({ queryKey: ['processes'] })
              }
            }}
            fullWidth
          />
        </Box>

        <Box component="section" sx={{ p: 2, px: 4 }}>
          <DataTable
            state={stateQuery}
            rows={listProcessesWithDetails}
            columns={DataTableImportedProcessColumns({
              onClickSeeItem: () => console.log("onClickSeeItem"),
              onClickUpdateItem: () => console.log("onClickUpdateItem"),
              onClickDeleteItem: () => console.log("onClickDeleteItem"),
              onClickCheckClient: (clientId) => navigate(`/cliente/${clientId}/detalhes`),
            })}
          />
        </Box>
      </Box>

      <ToastContainer
        open={openToast === "success"}
        message="Publicação excluída com sucesso."
        severity="success"
        onClose={() => setOpenToast("")}
      />
      
      <ToastContainer
        open={openToast === "error"}
        message="Ocorreu um erro ao excluir essa publicação."
        severity="error"
        onClose={() => setOpenToast("")}
      />

      <ModalConfirmation
        open={openModalConfirmation}
        title={"Excluir a publicação atual"}
        description={`Tem certeza que gostaria de excluir a publicação atual? Essa operacão é inversivel.`}
        handleClose={() => setOpenModalConfirmation(false)}
        handleAnswer={(answer) => handleDeletePublication(answer)}
      />
    </>
  )
}