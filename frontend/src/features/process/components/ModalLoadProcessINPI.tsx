import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  useForm,
  useWatch,
  type SubmitHandler
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
  Box, 
  Button, 
  Grid, 
  Modal, 
  Typography
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";

import { optionsQueryGetImportedProcessFromINPI } from "@/features/process/api/queryGetImportedProcessFromINPI";
import { ControlledInput } from "@/components/ControlledInputText";
import ToastContainer from "@/components/Toast";
import { 
  searchNewProcessFromINPI, 
  type SearchNewProcessFromINPIFormData 
} from "@/features/process/schema/searchNewProcessFromINPI";
import { ModalContainer } from "@/styles/modalContainer";

import type { ImportedProcessFromINPI } from "@shared/types/importedProcess";


interface ModalLoadProcessINPIProps {
  open: boolean
  handleClickTransfer: (process: ImportedProcessFromINPI) => void
  handleClose: () => void
}

export default function ModalLoadProcessINPI({
  open, handleClickTransfer, handleClose
}: ModalLoadProcessINPIProps) {

  const queryClient = useQueryClient()
  const [ searchPermission, setSearchPermission ] = useState(false)
  const [ processLoaded, setProcessLoaded ] = useState<ImportedProcessFromINPI>()
  const [ openToast, setOpenToast ] = useState("")

  const form = useForm<SearchNewProcessFromINPIFormData>({
    resolver:
      zodResolver(searchNewProcessFromINPI),
    defaultValues: processLoaded
  })

  const { errors } = form.formState

  const processNumberSource = useWatch({
    control: form.control,
    name: 'processNumber',
  })

  const { 
    data: importedProcessInformation,
    isSuccess,
    isLoading,
    isError,
  } = useQuery(
    optionsQueryGetImportedProcessFromINPI(processNumberSource, searchPermission)
  )

  useEffect(() => {
    if (isSuccess) {
      setProcessLoaded(importedProcessInformation);
      form.setValue("entireAnswer", importedProcessInformation.sourceEntireProcess)
      setOpenToast("success");
    }
  }, [isSuccess, processLoaded]);

  useEffect(() => {
    if (isError) {
      setOpenToast("error");
    }
  }, [isError]);

  function resetQueryGetProcessFromINPI() {
    queryClient.resetQueries({ queryKey: ["imported-process"] })
    setSearchPermission(false)
    setProcessLoaded(undefined)
    form.reset()
  }

  const onSubmit: SubmitHandler<SearchNewProcessFromINPIFormData> = async () => {

    const processLoaded: ImportedProcessFromINPI = {
      ...importedProcessInformation,
      filingDate: importedProcessInformation.filingDate,
      grantDate: importedProcessInformation.grantDate,
      expirationDate: importedProcessInformation.expirationDate,
    }
    
    handleClickTransfer(processLoaded)
    resetQueryGetProcessFromINPI()
  }
  
  const handleCloseModal = () => {
    resetQueryGetProcessFromINPI();
    handleClose()
  }
  
  return (
    <>
    <Modal
      open={open}
      onClose={handleCloseModal}
    >
      <ModalContainer>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h5"
            >
              Carregar processo diretamente do INPI
            </Typography>

            <Button onClick={handleCloseModal}>
              <GridCloseIcon />
            </Button>
          </Box>

          <Grid
            container
            spacing={4}
            sx={{ pt: 3, pb: 2 }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <ControlledInput
                control={form.control}
                type="number"
                name="processNumber"
                label="Número do processo:*"
                fullWidth
                error={!!errors?.processNumber}
                helperText={
                  String(errors?.processNumber?.message ?? "")
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Button              
                type="button"
                variant="outlined"
                fullWidth
                //TODO: Check the correct way to follow same propers of text without message error.
                sx={{ height: '56px' }}
                disabled={isLoading}
                loading={isLoading}
                onClick={() => setSearchPermission(true)}
              >
                Carregar
              </Button>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <ControlledInput
                control={form.control}
                label="Corpo do processo:*"
                name="entireAnswer"
                multiline
                rows={8}
                disabled
                fullWidth
                error={!!errors?.entireAnswer}
                helperText={
                  String(errors?.entireAnswer?.message ?? "")
                }
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                sx={{ marginTop: 2 }}
                type="submit"
                variant="contained"
                size="large"
                fullWidth
              >
                Carregar processo
              </Button>
            </Grid>
          </Grid>
        </form>
      </ModalContainer>
    </Modal>

    <ToastContainer
      open={openToast === "success"}
      message="Processo carregado com sucesso."
      severity="success"
      onClose={() => setOpenToast("")}
    />

    <ToastContainer
      open={openToast === "error"}
      message="Ocorreu um erro ao carregar o processo."
      severity="error"
      onClose={() => setOpenToast("")}
    />
    </>
  )
}