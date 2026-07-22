import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Box, Button } from "@mui/material";

import { optionsQueryListProcessHistoryWithDetails } from "@/features/process/api/queryListProcessHistoryWithDetails";
import { useMutationDeleteProcessHistoryWithFile } from "@/features/process/api/mutationDeleteProcessHistoryWithFile";
import DataTableProcessHistoryColumns from "@/features/process/components/DataTableProcessHistoryColumns";
import DataTable from "@/components/DataTable";
import HeaderPage from "@/components/HeaderPage";
import ModalConfirmation from "@/components/ModalConfirmation";
import ModalNewMagazine from "@/features/process/components/ModalNewMagazine";
import LoadingOverlay from "@/components/LoadingOverlay";
import ToastContainer from "@/components/Toast";


export default function ViewImportedMagazine() {

  const queryClient = useQueryClient();

  const [openModalConfirmation, setOpenModalConfirmation] = useState(false)
  const [openToast, setOpenToast] = useState("")
  const [modalNewMagazine, setModalNewMagazine] = useState(false);
  const [historyIdClicked, setHistoryIdClicked] = useState("");
  
  const {
    data: processHistoricWithDetails,
    isSuccess,
    isError,
    isLoading,
    refetch,
  } = useQuery(
    optionsQueryListProcessHistoryWithDetails()
  )

  const mutationDeleteProcessHistory =
    useMutationDeleteProcessHistoryWithFile({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      setOpenToast("success_imported_process"); 
    },
    onError: () => {
      setOpenToast("error_imported_process"); 
    },
  })

  const handleDelete = (historyId: string) => {
    setHistoryIdClicked(historyId)
    setOpenModalConfirmation(true)
  };

  function handleDeleteProcessHistory(action: boolean) {
    setOpenModalConfirmation(false)

    if (!action || !historyIdClicked) return
    
    mutationDeleteProcessHistory.mutate(
      historyIdClicked
    )

    refetch()
  }

  const stateQuery = "SUCCESS"
    isSuccess ? "SUCCESS" : 
    isLoading ? "LOADING" :
    isError ? "ERROR" : "IDLE";

  return (
    <>
      <Box component="section" sx={{ marginTop: 2 }}>
        <HeaderPage title="Listagem das revistas importadas"> 
          <Box
            component="div"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            <Button
              sx={{
                m: 2
              }}
              type="submit"
              variant="contained"
              size="large"
              color="warning"
              onClick={() => setModalNewMagazine(true)}
            >
              Importar revista
            </Button>
          </Box>
        </HeaderPage>

        <Box component="section" sx={{ p: 2}}>
          <DataTable
            state={stateQuery}
            rows={isSuccess ? 
              processHistoricWithDetails :
              []
            }
            columns={DataTableProcessHistoryColumns({
              onClickDeleteItem: (currentData) => handleDelete(currentData.id)
            })}
          />
        </Box>
      </Box>

      <ModalNewMagazine
        open={modalNewMagazine}
        onSubmitImport={(action) => {
          setOpenToast(action);
          setModalNewMagazine(false)
          refetch();
        }}
        handleClose={() => setModalNewMagazine(false)}
      />

      <ModalConfirmation
        open={openModalConfirmation}
        title={"Excluir esse registro de importação"}
        description={`Tem certeza que gostaria de EXCLUIR registro de importação atual? Essa operacão irá excluir os processos importados dessa revista e não é REVERSÍVEL.`}
        handleClose={() => setOpenModalConfirmation(false)}
        handleAnswer={(action) => handleDeleteProcessHistory(action)}
      />

      <LoadingOverlay
        open={mutationDeleteProcessHistory.isPending}
        message="Deletando a revista e seus respectivos processos importados, aguarde..."
      />

      <ToastContainer
        open={openToast === "success_imported_process"}
        message="Revista deletada com sucesso."
        severity="success"
        onClose={() => setOpenToast("")}
      />

      <ToastContainer
        open={openToast === "error_imported_process"}
        message="Ocorreu um erro ao deletar essa revista."
        severity="error"
        onClose={() => setOpenToast("")}
      />

      <ToastContainer
        open={openToast === "success"}
        message="Revista importada com sucesso. Verifique essa revista na listagem de processos."
        severity="success"
        onClose={() => setOpenToast("")}
      />

      <ToastContainer
        open={openToast === "warning"}
        message="Essa importação já foi executada, verifique seus dados na listagem dos processos."
        severity="warning"
        onClose={() => setOpenToast("")}
      />

      <ToastContainer
        open={openToast === "error"}
        message="Ocorreu um erro ao importar essa revista."
        severity="error"
        onClose={() => setOpenToast("")}
      />
    </>
  )
}