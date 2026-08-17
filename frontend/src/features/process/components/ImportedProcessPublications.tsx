import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Box,
  Button
} from "@mui/material";

import { optionsQueryListProcessPublication } from "@/features/process/api/queryListProcessPublication";
import { useMutationDeleteProcessPublication } from "@/features/process/api/mutationDeletePublication";
import DataTableProcessPublicationColumns from "@/features/process/components/DataTableProcessPublicationColumns";
import ModalLoadProcessPublicationINPI from "@/features/process/components/ModalLoadProcessPublicationINPI";
import DataTable from "@/components/DataTable";
import HeaderPage from "@/components/HeaderPage";
import ModalConfirmation from "@/components/ModalConfirmation";
import ModalViewEntityDetails from "@/components/ModalViewEntityDetails";
import ToastContainer from "@/components/Toast";
import { useDetailsModal } from "@/hooks/useDetailsModal";
import { processPublicationFields } from "@/features/process/utils/getRowProcessPublication";


interface ImportedProcessPublicationsProps {
  processId: string | undefined
  processNumber: string | undefined
}

export default function ImportedProcessPublications({
  processId, processNumber
}: ImportedProcessPublicationsProps) {

  const queryClient = useQueryClient();

  const [openModalImporter, setOpenModalImporter] = useState(false)
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false)
  const [processPublicationIdClicked, setProcessPublicationIdClicked] = useState("")
  const [openToast, setOpenToast] = useState("")

  const {
    data: currentProcessPublications,
    isSuccess,
    isLoading,
    isError,
    refetch,
  } = useQuery(optionsQueryListProcessPublication(processId!))

  const mutationDeleteProcessPublication =
    useMutationDeleteProcessPublication({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['process-publications', processId] })
      setOpenToast("success"); 
    },
    onError: () => {
      setOpenToast("error"); 
    },
  })

  function handleDelete(id: string) {
    setOpenModalConfirmation(true);
    setProcessPublicationIdClicked(id)
  }

  function handleDeactivateProcessPublication(action: boolean){

    setOpenModalConfirmation(false)
    if (!action || !processPublicationIdClicked) return
    
    mutationDeleteProcessPublication.mutate(
      processPublicationIdClicked
    )

    refetch()
  }

  const { openDetails, closeDetails, payload } = useDetailsModal();

  const stateQuery = 
    isSuccess ? "SUCCESS" : 
    isLoading ? "LOADING" :
    isError ? "ERROR" : "IDLE";

  return (
    <Box component="section" sx={{ px: 2 }}>
      <HeaderPage title="Publicações"> 
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
          onClick={() => setOpenModalImporter(true)}
        >
          Atualizar publicações
        </Button>
      </HeaderPage>

       <Box component="section">
          <DataTable
            state={stateQuery}
            rows={currentProcessPublications}
            columns={DataTableProcessPublicationColumns({
              onClickSeeItem: (currentItem) => openDetails({
                title: "Detalhes da publicação selecionada",
                data: currentItem,
                fields: processPublicationFields,
              }),
              onClickDeleteItem: (id) => handleDelete(id),
            })}
          />
        </Box>

        <ToastContainer
          open={openToast === "success"}
          message="Processo desativado com sucesso."
          severity="success"
          onClose={() => setOpenToast("")}
        />
        
        <ToastContainer
          open={openToast === "error"}
          message="Ocorreu um erro ao desativar esse processo."
          severity="error"
          onClose={() => setOpenToast("")}
        />

        <ModalViewEntityDetails
          open={Boolean(payload)}
          title={payload?.title ?? ""}
          data={payload?.data}
          fields={payload?.fields ?? []}
          handleClose={closeDetails}
        />

        <ModalLoadProcessPublicationINPI
          open={openModalImporter}
          processId={processId}
          processNumber={processNumber}
          handleClose={() => setOpenModalImporter(false)}
        />

        <ModalConfirmation
          open={openModalConfirmation}
          title={"Desativar a publicação atual"}
          description={`Tem certeza que gostaria de desativar a publicação atual? Essa operacão não é inversivel.`}
          handleClose={() => setOpenModalConfirmation(false)}
          handleAnswer={handleDeactivateProcessPublication}
        />
    </Box>
  )
}