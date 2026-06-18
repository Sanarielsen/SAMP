import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Box, Button, Grid, Modal, Typography } from "@mui/material"
import { GridCloseIcon } from "@mui/x-data-grid"

import { useMutationUpdatePaymentInstallmentToPay } from "@/features/payment/api/mutationUpdatePaymentInstallmentToPay"
import { ControlledInputMask } from "@/components/ControlledInputMask"
import { 
  updatePaymentInstallmentToPay, 
  type UpdatePaymentInstallmentToPaySchemaFormData 
} from "@/features/payment/schema/updatePaymentInstallmentToPay"
import { convertDataToServerString } from "@/utils/convertDataToServerString"
import { ControlledFileInput } from "@/components/ControlledFIleInput"


interface ModalInstallmentToPayProps {
  open: boolean
  id: string
  onSubmitPaidAt: (action: string) => void
  handleClose: () => void
}

export default function ModalInstallmentToPay({
  open, id, onSubmitPaidAt, handleClose
}: ModalInstallmentToPayProps) {

  const form = useForm<UpdatePaymentInstallmentToPaySchemaFormData>({
    resolver:
      zodResolver(updatePaymentInstallmentToPay),
    defaultValues: {
      file: undefined,
      paidAt: "",
    },
  })
  
  const mutationUpdateInstallmentToPay =
    useMutationUpdatePaymentInstallmentToPay({
      onSuccess: () => {
        onSubmitPaidAt("success")
        setTimeout(() => {
          mutationUpdateInstallmentToPay.reset();
          form.reset();
        }, 5000);
      },
      onError: () => {
        onSubmitPaidAt("error")
        form.reset();
      },
  })

  const onSubmit: SubmitHandler<UpdatePaymentInstallmentToPaySchemaFormData> = async (data) => {

    const convertPaidAt = convertDataToServerString(data.paidAt)

    mutationUpdateInstallmentToPay.mutate({
      id,
      paidAt: convertPaidAt,
      file: data.file
    })
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
              Marcar parcela como paga?
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
              <ControlledInputMask
                control={form.control}
                variant="outlined"
                name="paidAt"
                mask={"99/99/9999"}
                label="Data de pagamento a ser registrada:*"
                fullWidth
                error={!!form.formState.errors.paidAt}
                helperText={form.formState.errors.paidAt?.message ?? ""}
              />
            </Grid>

            <Grid size={{ xs: 12}}>
              <ControlledFileInput
                control={form.control}
                name="file"
              />
            </Grid>

            <Grid size={{ xs: 12}}>

              <Button
                type="submit"
                variant="contained"
                size="large"
                loading={
                  mutationUpdateInstallmentToPay.isPending ||
                  mutationUpdateInstallmentToPay.isSuccess
                }
                disabled={
                  mutationUpdateInstallmentToPay.isPending ||
                  mutationUpdateInstallmentToPay.isSuccess
                }
                fullWidth
                
              >
                Registrar pagamento
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  )
}