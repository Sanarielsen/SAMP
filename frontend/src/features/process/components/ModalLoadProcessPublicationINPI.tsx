import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
  Box, 
  Button, 
  Grid, 
  Modal, 
  Typography
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";

import { optionsQueryListProcessPublicationFromINPI } from "@/features/process/api/queryListProcessPublicationFromINPI";
import { useMutationPostManyProcessPublications } from "@/features/process/api/mutationPostManyPublications";
import { CheckBoxWithDetailsList } from "@/components/CheckBoxWithDetailsList";
import ToastContainer from "@/components/Toast";
import { 
  publicationFormSchema,
  type PublicationFormData
} from "@/features/process/schema/processPublicationFromINPI";
import { ModalContainer } from "@/styles/modalContainer";

import type { 
  ProcessPublicationFromINPI 
} from "@shared/types/processPublication";


interface ModalLoadProcessPublicationINPIProps {
  open: boolean
  processNumber: string,
  processId?: string | undefined,
  handleClose: () => void
}

export default function ModalLoadProcessPublicationINPI({
  open, processNumber, handleClose, processId
}: ModalLoadProcessPublicationINPIProps) {

  const queryClient = useQueryClient()

  const [searchPermission, setSearchPermission] = useState(false)
  const [openToast, setOpenToast] = useState("")

  const { 
    data: processPublicationsFromINPI,
    isSuccess,
    isLoading,
  } = useQuery<ProcessPublicationFromINPI[]>(
    optionsQueryListProcessPublicationFromINPI(processNumber, searchPermission)
  )

  const form = useForm<PublicationFormData>({
    resolver:
      zodResolver(publicationFormSchema),
    defaultValues: {
      publications: [],
    },
  })

  useEffect(() => {
    if (isSuccess) {
      setSearchPermission(false);
      setOpenToast("success");
    }
  }, [isSuccess]);

  const mutationPostMany = useMutationPostManyProcessPublications({
    onSuccess: () => {
      setOpenToast("success")
      queryClient.invalidateQueries({ queryKey: ['process-publications', processId] })
      mutationPostMany.reset();
      handleClose()
    },
    onError: () => setOpenToast("error")
  })

  const isRunningSomething = 
    mutationPostMany.isPending ||
    mutationPostMany.isSuccess

  const onSubmit: SubmitHandler<PublicationFormData> = async (data) => {
    if (!processId) {
      setOpenToast("error")
      return
    }

    const publications = data.publications.map(p => ({
      magazineNumber: p.magazineNumber,
      publicationDate: p.publicationDate,
      dispatch: p.dispatch,
      certificate: p.certificate ?? null,
      description: p.description ?? null,
      complement: p.complement ?? null,
    }))

    mutationPostMany.mutate({ processId, publications })
  }

  return (
    <>
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
                Carregar publicações desse processo diretamente do INPI
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
                <Button              
                  type="button"
                  variant="outlined"
                  fullWidth
                  sx={{ height: '56px' }}
                  disabled={isLoading}
                  loading={isLoading}
                  onClick={() => setSearchPermission(true)}
                >
                  Carregar
                </Button>
              </Grid>
  
              <Grid size={{ xs: 12 }}>
                <CheckBoxWithDetailsList
                  items={processPublicationsFromINPI ?? []}
                  control={form.control}
                  name="publications"
                  getItemId={(publication) =>
                    `${publication.magazineNumber}::${publication.complement ?? ''}`
                  }
                  getItemLabel={(publication) =>
                    `Revista ${publication.magazineNumber}${publication.complement ? ` - ${publication.complement}` : ''} - ${publication.publicationDate}`
                  }
                />
              </Grid>
  
              <Grid size={{ xs: 12 }}>
                <Button
                  sx={{ marginTop: 2 }}
                  type="submit"
                  variant="contained"
                  loading={isRunningSomething}
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
        message="Publicações do processo carregadas com sucesso."
        severity="success"
        onClose={() => setOpenToast("")}
      />
      
      <ToastContainer
        open={openToast === "error"}
        message="Ocorreu um erro ao carregar as publicações desse processo no INPI."
        severity="error"
        onClose={() => setOpenToast("")}
      />
    </>
  )
}