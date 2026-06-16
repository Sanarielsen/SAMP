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
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ReceiptIcon from '@mui/icons-material/Receipt';

import { 
  updatePaymentInstallment, 
  type UpdatePaymentInstallmentSchemaFormData 
} from "@/features/payment/schema/updatePaymentInstallmentsSchema";
import { ControlledComboBox } from "@/components/ControlledComboBox";
import { ControlledInput } from "@/components/ControlledInputText";
import { ControlledInputMask } from "@/components/ControlledInputMask";
import GroupText from "@/components/GroupText";

import { type PaymentInstallment, type UpdatePaymentInstallmentDTO } from '@shared/types/paymentInstallments'
import { parseDMYDate } from "@/utils/formatDate";

type MuiColor =
  | "primary.main"
  | "secondary.main"
  | "success.main"
  | "warning.main"
  | "error.main"
  | "grey.800"
  | "grey.400"
  | "grey.100";

const listPaymentMethods = [
  { value: "Crédito", label: "Crédito" },
  { value: "Débito", label: "Débito" },
  { value: "Pix", label: "Pix" },
  { value: "Boleto", label: "Boleto" },
]

interface InstallmentDetailProps {
  currentPayment: PaymentInstallment
  color?: MuiColor
  onClickUpdatePayment: (data: UpdatePaymentInstallmentDTO) => void
}

export default function InstallmentDetail({
  currentPayment, color, onClickUpdatePayment
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

      //method: data.method,

      obserservation: currentPayment.observation ?? "",
    }
  })
  const { errors } = form.formState

  const onSubmit: SubmitHandler<UpdatePaymentInstallmentSchemaFormData> = async () => {

    const paidAtValue = form.getValues('paidAt');
    const dueDateValue = form.getValues('dueDate');

    const payload: UpdatePaymentInstallmentDTO = {
      id: currentPayment.id,
      installment: Number(form.getValues('installment')),
      amountInCents: Number(form.getValues('amountInCents')) * 100,
      dueDate: parseDMYDate(dueDateValue)!,
      paidAt: paidAtValue ? parseDMYDate(paidAtValue) : null,
      observation: form.getValues('obserservation') || null,
      receiptFilePath: form.getValues('receiptFilePath') || null,
    }

    onClickUpdatePayment(payload)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Box component="section" sx={{ backgroundColor: color }}>
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
              name={'method'}
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
              error={!!errors?.amountInCents}
              helperText={
                String(errors?.amountInCents?.message ?? "")
              }
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 2 }}>

            <IconButton
              onClick={() => console.log("Adicionar observacao!")}
            >          
              <Tooltip title="Inserir observacoes">
                <NoteAltIcon fontSize="large" />
              </Tooltip>
            </IconButton>

            
            <IconButton
              onClick={() => console.log("Adicionar comprovante!")}
            >          
              <Tooltip title="Enviar comprovante">
                <ReceiptIcon fontSize="large" />
              </Tooltip>
            </IconButton>

            <IconButton
              type="submit"
            >          
              <Tooltip title="Salvar">
                <SaveAsIcon fontSize="large" />
              </Tooltip>
            </IconButton>
          </Grid>
        </Grid>
        <Divider/>
      </Box>
    </form>
  )
}