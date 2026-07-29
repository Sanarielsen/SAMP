import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
  Box, 
  Button, 
  Grid, 
  Modal, 
  Typography
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";

import { ControlledInput } from "@/components/ControlledInputText";
import { 
  searchNewProcessFromINPI, 
  type SearchNewProcessFromINPIFormData 
} from "@/features/process/schema/searchNewProcessFromINPI";
import { ModalContainer } from "@/styles/modalContainer";


interface ModalLoadProcessINPIProps {
  open: boolean
  handleClose: () => void
}

export default function ModalLoadProcessINPI({
  open, handleClose
}: ModalLoadProcessINPIProps) {

  const form = useForm<SearchNewProcessFromINPIFormData>({
    resolver:
      zodResolver(searchNewProcessFromINPI)
    })
  const { errors } = form.formState

  const onSubmit: SubmitHandler<SearchNewProcessFromINPIFormData> = async (data) => {

    console.log(data)
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
                onClick={() => console.log("Execute parser")}
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