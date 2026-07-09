import { useForm, type SubmitHandler } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
  Box, 
  Button, 
  Grid, 
  Modal, 
  Typography 
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";

import { 
  optionsQueryListProcessCategoryAsAOptions
} from "@/features/process/api/queryListProcessCategoryAsAOptions";
import { 
  useMutationPostProcessImportMagazine 
} from "@/features/process/api/mutatePostProcessImportMagazine";
import { ControlledFileInput } from "@/components/ControlledFIleInput";
import { ControlledInput } from "@/components/ControlledInputText";
import { ControlledComboBox } from "@/components/ControlledComboBox";
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

  const { 
    data: listProcessCategoryAsAOptions,
    isSuccess: isSuccessCategoryOptions,
  } = useQuery(
    optionsQueryListProcessCategoryAsAOptions()
  )

  const mutationPostProcessImportMagazine =
    useMutationPostProcessImportMagazine({
      onSuccess: (response) => {
        mutationPostProcessImportMagazine.reset()
        if (response.status === 201) onSubmitImport("success")
        if (response.status === 200) onSubmitImport("warning")
      },
      onError: () => {
        mutationPostProcessImportMagazine.reset()
        onSubmitImport("error")
      },
  })

  const form = useForm<NewMagazineFormData>({
    resolver: zodResolver(newMagazineSchema),
  });
  const { errors } = form.formState

  const onSubmit: SubmitHandler<NewMagazineFormData> = async (data) => {

    const formData = new FormData();

    formData.append("categoryId", data.categoryId);
    formData.append("numberMagazine", data.numberMagazine);
    formData.append("fileMagazine", data.fileMagazine);

    form.reset();
    mutationPostProcessImportMagazine.mutate(formData)
  }

  const isRunningSomething = 
    mutationPostProcessImportMagazine.isPending
     || mutationPostProcessImportMagazine.isSuccess

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
            <Grid size={{ md: 12, lg: 6 }}>
              <ControlledInput
                control={form.control}
                type="number"
                name={`numberMagazine`}
                label="Número da revista"
                placeholder='Categoria a ser importada'
                fullWidth
                error={!!errors.numberMagazine}
                helperText={
                  String(errors.numberMagazine?.message ?? "")
                }
              />
            </Grid>
            <Grid size={{ md: 12, lg: 6 }}>
              <ControlledComboBox
                control={form.control}
                name={'categoryId'}
                label='Categoria'
                placeholder='Categoria a ser importada'
                options={ isSuccessCategoryOptions ? listProcessCategoryAsAOptions : []}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <ControlledFileInput
                control={form.control}
                placeholder="Revista em formato PDF"
                name="fileMagazine"
                accept=".pdf,application/pdf"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12 }}>

              <Button
                type="submit"
                variant="contained"
                size="large"
                loading={isRunningSomething}
                disabled={isRunningSomething}
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