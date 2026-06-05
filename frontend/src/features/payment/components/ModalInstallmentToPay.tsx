import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { 
  Box, 
  Button, 
  Grid, 
  Modal, 
  Typography
 } from "@mui/material"
import { GridCloseIcon } from "@mui/x-data-grid"

import { useMutationPatchPaymentInstallment } from "@/features/payment/api/mutationUpdatePaymentInstallment"
import { useMutationUpdatePaymentInstallmentToPay } from "@/features/payment/api/mutationUpdatePaymentInstallmentToPay"
import { ControlledInputMask } from "@/components/ControlledInputMask"
import { ControlledFileInput } from "@/components/ControlledFIleInput"
import { 
  updatePaymentInstallmentToPay, 
  type UpdatePaymentInstallmentToPaySchemaFormData 
} from "@/features/payment/schema/updatePaymentInstallmentToPay"
import { convertDataToServerString } from "@/utils/convertDataToServerString"
import { formatAsVisualOnlyDate } from "@/utils/formatDate2"

import type { PaymentInstallment } from "@shared/types/paymentInstallments"


interface ModalInstallmentToPayProps {
  open: boolean
  installment: PaymentInstallment
  onSubmitPaidAt: (action: string) => void
  handleClose: () => void
}

export default function ModalInstallmentToPay({
  open, installment, onSubmitPaidAt, handleClose
}: ModalInstallmentToPayProps) {

  const form = useForm<UpdatePaymentInstallmentToPaySchemaFormData>({
    resolver:
      zodResolver(updatePaymentInstallmentToPay),
    defaultValues: {
      paidAt: installment.paidAt
    ? formatAsVisualOnlyDate(installment.paidAt)
    : "",
    },
  })

  const mutationPatchInstallment =
    useMutationPatchPaymentInstallment({
      onSuccess: () => {
        onSubmitPaidAt("success")
        setTimeout(() => {
          mutationPatchInstallment.reset();
          form.reset();
        }, 5000);
      },
      onError: () => {
        onSubmitPaidAt("error")
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
      },
  })

  const isRunningSomething = mutationPatchInstallment.isPending ||
    mutationPatchInstallment.isSuccess ||
    mutationUpdateInstallmentToPay.isPending ||
    mutationUpdateInstallmentToPay.isSuccess

  const hasPaidBefore = installment.paidAt === null ? 12 : 6
  
  function handleCancelInstallmentWasPaid() {
    mutationPatchInstallment.mutate({
      id: installment.id,
      paidAt: null,
      receiptFilePath: null
    })
  }

  const onSubmit: SubmitHandler<UpdatePaymentInstallmentToPaySchemaFormData> = async (data) => {

    const convertPaidAt = convertDataToServerString(data.paidAt)

    mutationUpdateInstallmentToPay.mutate({
      id: installment.id,
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

              {installment.receiptFilePath && (
                <div>
                  <p>Comprovante atual:</p>
                  <a
                    href={installment.receiptFilePath}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Carregar arquivo
                  </a>
                </div>
              )}
            </Grid>
            
            { hasPaidBefore === 6 && (

              <Grid size={{ xs: 12, sm: hasPaidBefore }}>

                <Button
                  type="button"
                  variant="contained"
                  size="large"
                  color="error"
                  onClick={handleCancelInstallmentWasPaid}
                  loading={isRunningSomething}
                  disabled={isRunningSomething}
                  fullWidth
                >
                  Cancelar pagamento
                </Button>
              </Grid>
            ) }

            <Grid size={{ xs: 12, sm: hasPaidBefore }}>

              <Button
                type="submit"
                variant="contained"
                size="large"
                loading={isRunningSomething}
                disabled={isRunningSomething}
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