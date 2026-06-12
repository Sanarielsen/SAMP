import { useForm } from "react-hook-form";
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

import { type PaymentInstallment } from '@shared/types/paymentInstallments'

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
  data: PaymentInstallment
  color?: MuiColor
}

export default function InstallmentDetail({
  data, color
}: InstallmentDetailProps) {

  const form = useForm<UpdatePaymentInstallmentSchemaFormData>({
    resolver:
      zodResolver(updatePaymentInstallment),
    defaultValues: {
      amountInCents: String(
        data.amountInCents / 100
      ),

      dueDate: dayjs(data.dueDate)
        .format("DD/MM/YYYY"),

      //method: data.method,

      obserservation: data.observation ?? "",
    }
  })
  const { errors } = form.formState

  return (
    <Box component="section" sx={{ backgroundColor: color }}>
      <Grid container spacing={4} sx={{ pt: 2, pb: 3, px: 4 }}>
        <Grid size={{ xs: 12, sm: 3 }}>
          <GroupText
            title={`Parcela: ${data.installment}`}
            value={
              data.updatedAt
                ? `Atualizado em ${dayjs(data.createdAt).format("DD/MM/YYYY HH:mm")}`
                : `Criado em ${dayjs(data.createdAt).format("DD/MM/YYYY HH:mm")}`
            }
            observation={`Observacão: ${data.observation}`}
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
            mask="00/00/0000"
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
            onClick={() => console.log("Salva a linha atual")}
          >          
            <Tooltip title="Salvar">
              <SaveAsIcon fontSize="large" />
            </Tooltip>
          </IconButton>
        </Grid>
      </Grid>
      <Divider/>
    </Box>
  )
}