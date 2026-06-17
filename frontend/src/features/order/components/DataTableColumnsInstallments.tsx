import { 
  IconButton,
  Tooltip 
} from "@mui/material";
import { 
  type GridColDef 
} from "@mui/x-data-grid";
import NoteAltIcon from '@mui/icons-material/NoteAlt';

import { formatCurrency } from "@/features/order/utils/formatCurrency";

import { formatAsVisualDate, formatAsVisualOnlyDate } from "@/utils/formatAsAVisualDate";

import type { PaymentInstallment } from "@shared/types/paymentInstallments";

export default function DataTableColumnsInstallments(): GridColDef<PaymentInstallment>[] {
  return [
    {
      field: "installment",
      headerName: "Parcela",
      flex: 1,
    },
    {
      field: "amountInCents",
      headerName: "Valor",
      flex: 1,
      valueFormatter: (value) => {
        if (!value) return "-"
        return formatCurrency(value)
      },
    },
    {
      field: "dueDate",
      headerName: "Vencimento",
      flex: 1,
      valueFormatter: (value) => {
        if (!value) return "-"
        return formatAsVisualOnlyDate(value)
      },
    },
    {
      field: "paidAt",
      headerName: "Data de pagamento",
      flex: 1,
      valueFormatter: (value) => {
        if (!value) return "-"
        return formatAsVisualOnlyDate(value)
      },
    },
    {
      field: "receiptFilePath",
      headerName: "Comprovante",
      flex: 1,
      valueFormatter: (value) => {
        if (!value) return "-"
        return value
      },
    },
    {
      field: "observation",
      headerName: "Observacao",
      flex: 1,
      renderCell: (params) =>
        params.row.observation ? (
          <Tooltip title={params.row.observation}>
            <IconButton>
              <NoteAltIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        ) : (
          "-"
        ),
    },
    {
      field: "lastChange",
      headerName: "Criado/Atualizado em",
      flex: 1,
      valueGetter: (_, row) => row.updatedAt ?? row.createdAt,
      valueFormatter: (value) => {
        if (!value) return "-";
        return formatAsVisualDate(value);
      },
    }
  ]
}
