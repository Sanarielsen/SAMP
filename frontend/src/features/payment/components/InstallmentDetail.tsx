import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";

import { 
  Box, 
  Divider, 
  Grid, 
  IconButton, 
  Tooltip 
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';

import { 
  updatePaymentInstallment, 
  type UpdatePaymentInstallmentSchemaFormData 
} from "@/features/payment/schema/updatePaymentInstallmentsSchema";
import { ControlledComboBox } from "@/components/ControlledComboBox";
import { ControlledInput } from "@/components/ControlledInputText";
import { ControlledInputMask } from "@/components/ControlledInputMask";
import GroupText from "@/components/GroupText";
import { parseDate } from "@/utils/manageDate";

import type { OptionsControlledBox } from "@shared/types/values";
import { 
  type PaymentInstallment, 
  type UpdatePaymentInstallmentDTO 
} from '@shared/types/paymentInstallments'



interface InstallmentDetailProps {
  currentPayment: PaymentInstallment
  listPaymentMethods: OptionsControlledBox[] | []
  color?: string
  onClickUpdatePayment: (data: UpdatePaymentInstallmentDTO) => void
  onClickUpdateObservation: (data: PaymentInstallment) => void
  onClickSendPaidData: (current: PaymentInstallment) => void
}

export default function InstallmentDetail({
  currentPayment, 
  listPaymentMethods, 
  color, 
  onClickUpdatePayment, 
  onClickUpdateObservation,
  onClickSendPaidData,
}: InstallmentDetailProps) {

  const form = useForm<UpdatePaymentInstallmentSchemaFormData>({
    resolver:
      zodResolver(updatePaymentInstallment),
    defaultValues: {
      installment: String(currentPayment.installment),

      amountInCents: String(
        currentPayment.amountInCents / 100
      ),

      dueDate: dayjs(currentPayment.dueDate)
        .format("DD/MM/YYYY"),

      methodId: Number(currentPayment.methodId),

      obserservation: currentPayment.observation ?? "",
    }
  })
  const { errors } = form.formState

  const dueDate = dayjs(currentPayment.dueDate);

  const hasPaid = 
  currentPayment.paidAt !== null 
    ? 'success.200' : 
  dueDate.isSame(dayjs(), "day") 
      ? 'warning.200' :
  dueDate.isBefore(dayjs(), "day")
      ? 'error.200' :
  color == 'secondInstallment'
      ? 'grey.100' : undefined

  const onSubmit: SubmitHandler<UpdatePaymentInstallmentSchemaFormData> = async () => {

    const paidAtValue = form.getValues('paidAt');
    const dueDateValue = form.getValues('dueDate');

    const payload: UpdatePaymentInstallmentDTO = {
      id: currentPayment.id,
      installment: Number(form.getValues('installment')),
      amountInCents: Number(form.getValues('amountInCents')) * 100,
      methodId: Number(form.getValues('methodId')),
      dueDate: parseDate(dueDateValue)!,
      paidAt: paidAtValue ? parseDate(paidAtValue) : undefined,
      observation: form.getValues('obserservation') || null,
      receiptFilePath: form.getValues('receiptFilePath') || null,
    }

    onClickUpdatePayment(payload)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Box component="section" sx={{ backgroundColor: hasPaid }}>
        <Grid container spacing={4} sx={{ pt: 2, pb: 3, px: 4 }}>
          <Grid size={{ xs: 12, sm: 3 }}>
            <GroupText
              title={`Parcela: ${currentPayment.installment}`}
              value={
                currentPayment.updatedAt
                  ? `Atualizado em ${dayjs(currentPayment.updatedAt).format("DD/MM/YYYY HH:mm")}`
                  : `Criado em ${dayjs(currentPayment.createdAt).format("DD/MM/YYYY HH:mm")}`
              }
              observation={`Observacão: ${currentPayment.observation}`}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 3, md: 2}}>
            <ControlledInput
              type="number"
              control={form.control}
              label="Valor da parcela"
              name="amountInCents"
              fullWidth
              error={!!errors?.amountInCents}
              helperText={
                String(errors?.amountInCents?.message ?? "")
              }
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 3, md: 2}}>
            <ControlledComboBox
              control={form.control}
              name={'methodId'}
              label='Método de pagamento'
              options={listPaymentMethods}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 3, md: 2 }}>
            <ControlledInputMask
              control={form.control}
              label="Vencimento"
              name="dueDate"
              mask="99/99/9999"
              fullWidth
              error={!!errors?.dueDate}
              helperText={
                String(errors?.dueDate?.message ?? "")
              }
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                height: "100%",
              }}
            >
              <IconButton
                onClick={() => onClickUpdateObservation(currentPayment)}
                sx={{
                  flex: "0 0 auto",
                  width: 40,
                  height: 40,
                  minWidth: 40,
                  minHeight: 40,
                  p: 1,
                  borderRadius: "50%",
                  boxShadow: "none",
                  backgroundColor: "transparent",
                  transition: "box-shadow 0.2s ease, transform 0.2s ease",
                  "&:hover": {
                    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.18)",
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                  "&:focus-visible": {
                    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.18)",
                  },
                  "&:active": {
                    boxShadow: "0 1px 5px rgba(0, 0, 0, 0.14)",
                  },
                }}
              >
                <Tooltip title="Inserir observacoes">
                  <NoteAltIcon fontSize="large" />
                </Tooltip>
              </IconButton>

              {/* <IconButton
                onClick={() => console.log("Adicionar comprovante!")}
              >
                <Tooltip title="Enviar comprovante">
                  <ReceiptIcon fontSize="large" />
                </Tooltip>
              </IconButton> */}

              {/* TODO: check how can I componize it, because dont have same structure if put it in a component */}
              <IconButton
                onClick={() => onClickSendPaidData(currentPayment)}
                sx={{
                  flex: "0 0 auto",
                  width: 40,
                  height: 40,
                  minWidth: 40,
                  minHeight: 40,
                  p: 1,
                  borderRadius: "50%",
                  boxShadow: "none",
                  backgroundColor: "transparent",
                  transition: "box-shadow 0.2s ease, transform 0.2s ease",
                  "&:hover": {
                    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.18)",
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                  "&:focus-visible": {
                    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.18)",
                  },
                  "&:active": {
                    boxShadow: "0 1px 5px rgba(0, 0, 0, 0.14)",
                  },
                }}
              >
                <Tooltip title="Marcar como pago">
                  <CheckCircleIcon fontSize="large" />
                </Tooltip>
              </IconButton>

              <IconButton
                type="submit"
                sx={{
                  flex: "0 0 auto",
                  width: 40,
                  height: 40,
                  minWidth: 40,
                  minHeight: 40,
                  p: 1,
                  borderRadius: "50%",
                  boxShadow: "none",
                  backgroundColor: "transparent",
                  transition: "box-shadow 0.2s ease, transform 0.2s ease",
                  "&:hover": {
                    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.18)",
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                  "&:focus-visible": {
                    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.18)",
                  },
                  "&:active": {
                    boxShadow: "0 1px 5px rgba(0, 0, 0, 0.14)",
                  },
                }}
              >
                <Tooltip title="Salvar">
                  <SaveAsIcon fontSize="large" />
                </Tooltip>
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Divider/>
      </Box>
    </form>
  )
}