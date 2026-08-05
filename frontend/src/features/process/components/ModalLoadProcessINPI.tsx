import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import { 
  searchNewProcessFromINPI, 
  type SearchNewProcessFromINPIFormData 
} from "@/features/process/schema/searchNewProcessFromINPI";
import { ModalContainer } from "@/styles/modalContainer";

import type { ImportedProcessDetailFromINPI, ImportedProcessPayload } from "@shared/types/importedProcess";
import { convertStringBrazilianDateToDate } from "@/utils/convertDataToServerString";


interface ModalLoadProcessINPIProps {
  open: boolean
  handleClickTransfer: (process: ImportedProcessPayload) => void
  handleClose: () => void
}

export default function ModalLoadProcessINPI({
  open, handleClickTransfer, handleClose
}: ModalLoadProcessINPIProps) {

  const [ searchPermission, setSearchPermission ] = useState(false)
  const [ processLoaded, setProcessLoaded ] = useState<ImportedProcessDetailFromINPI>()

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
  } = useQuery(
    optionsQueryGetImportedProcessFromINPI(processNumberSource, searchPermission)
  )

  useEffect(() => {
    if (isSuccess) {
      setProcessLoaded(importedProcessInformation);
      form.setValue("entireAnswer", importedProcessInformation.sourceEntireProcess)
    }
  }, [isSuccess, processLoaded]);


  const onSubmit: SubmitHandler<SearchNewProcessFromINPIFormData> = async () => {

    console.log("Filling date: ", new Date(importedProcessInformation.filingDate))

    const processLoaded: ImportedProcessPayload = {
      ...importedProcessInformation,
      filingDate: convertStringBrazilianDateToDate(importedProcessInformation.filingDate),
      grantDate: convertStringBrazilianDateToDate(importedProcessInformation.grantDate),
      expirationDate: convertStringBrazilianDateToDate(importedProcessInformation.expirationDate),
      updatedAtByMagazine: importedProcessInformation.updatedAtByMagazine,
      processMagazine: importedProcessInformation.magazineNumber,
      status: importedProcessInformation.status
    }
    
    handleClickTransfer(processLoaded)
  }
  
  return (
    <Modal
      open={open}
      onClose={handleClose}
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

            <Button onClick={handleClose}>
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
  )
}