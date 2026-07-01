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

import { ControlledFileInput } from "@/components/ControlledFIleInput";
import { 
  newMagazineSchema, 
  type NewMagazineFormData
 } from "@/features/process/schema/newMagazineSchema";

 
interface ModalNewMagazineProps {
  open: boolean
  onSubmitImport: (action: string) => void
  handleClose: () => void
}

export default function ModalNewMagazine({
  open, onSubmitImport, handleClose
}: ModalNewMagazineProps) {

  const form = useForm<NewMagazineFormData>({
    resolver: zodResolver(newMagazineSchema),
  });

  const onSubmit: SubmitHandler<NewMagazineFormData> = async (data) => {

    console.log("Formulário enviado: ", data)

    form.reset();

    onSubmitImport("sucess")
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",

          width: "70%",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
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
              Importar revista
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
            <Grid size={{ xs: 12}}>
              <ControlledFileInput
                control={form.control}
                name="file"
                accept=".pdf,application/pdf"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12 }}>

              <Button
                type="submit"
                variant="contained"
                size="large"
                // loading={isRunningSomething}
                // disabled={isRunningSomething}
                fullWidth
              >
                Iniciar importacão
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  )
}