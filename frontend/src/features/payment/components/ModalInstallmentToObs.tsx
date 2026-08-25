import { 
  useForm, 
  type SubmitHandler 
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { 
  Box, 
  Button, 
  Grid, 
  Modal, 
  Typography
 } from "@mui/material"
import { GridCloseIcon } from "@mui/x-data-grid"
import { useEffect } from "react"

import { useMutationPatchPaymentInstallmentToObs } from "@/features/payment/api/mutationUpdatePaymentInstallmentToObs"
import { ControlledInput } from "@/components/ControlledInputText"
import { 
  updatePaymentInstallmentToObs, 
  type UpdatePaymentInstallmentToObsSchemaFormData 
} from "@/features/payment/schema/updatePaymentInstallmentToObs"

import type { PaymentInstallment } from "@shared/types/paymentInstallment"


interface ModalInstallmentToObsProps {
  open: boolean
  installment: PaymentInstallment
  onSubmitObservation: (action: string) => void
  handleClose: () => void
}

export default function ModalInstallmentToObs({
  open, installment, onSubmitObservation, handleClose
}: ModalInstallmentToObsProps) {

  const form = useForm<UpdatePaymentInstallmentToObsSchemaFormData>({
    resolver:
      zodResolver(updatePaymentInstallmentToObs),
    defaultValues: {
      observation: installment.observation
    }
  })

  useEffect(() => {
    form.reset({
      observation: installment.observation ?? "",
    })
  }, [installment.id, installment.observation, form])
  
  const mutationUpdateInstallmentToObs =
    useMutationPatchPaymentInstallmentToObs({
      onSuccess: () => {
        onSubmitObservation("success")
        setTimeout(() => {
          mutationUpdateInstallmentToObs.reset();
          form.reset();
        }, 5000);
      },
      onError: () => {
        onSubmitObservation("error")
      },
  })

  const isRunningSomething = 
    mutationUpdateInstallmentToObs.isPending ||
    mutationUpdateInstallmentToObs.isSuccess

  const onSubmit: SubmitHandler<UpdatePaymentInstallmentToObsSchemaFormData> = async (data) => {

    mutationUpdateInstallmentToObs.mutate({
      id: installment.id,
      observation: data.observation,
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
              Adiciona alguma observação nessa parcela?
            </Typography>

            <Button onClick={() => {
              form.reset();
              handleClose()
            }}>
              <GridCloseIcon />
            </Button>
          </Box>

          <Grid
            container
            spacing={4}
            sx={{ pt: 3, pb: 2 }}
          >
            <Grid size={{ xs: 12}}>
              <ControlledInput
                control={form.control}
                variant="outlined"
                name="observation"
                label="Observação:"
                fullWidth
                error={!!form.formState.errors.observation}
                helperText={form.formState.errors.observation?.message ?? ""}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>

              <Button
                type="submit"
                variant="contained"
                size="large"
                loading={isRunningSomething}
                disabled={isRunningSomething}
                fullWidth
              >
                Registrar observação
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  )
}