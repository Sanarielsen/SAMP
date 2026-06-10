import { 
  GridDeleteIcon, 
  GridLoadIcon, 
  GridSearchIcon, 
  type GridColDef 
} from "@mui/x-data-grid";
import { 
  IconButton, 
  Stack, 
  Tooltip 
} from "@mui/material";

import { type PaymentDetailDTO } from "@shared/types/payment"
import { formatCurrency } from "../utils/formatCurrency";

type ColumnsPaymentsProps = {
  onClickUpdateItem: (id: string) => void
  onClickSeeItem: (currentItem: PaymentDetailDTO) => void
  onClickDeleteItem: (currentItem: PaymentDetailDTO) => void
}


export default function DataTableColumnsPayments({
  onClickUpdateItem, onClickSeeItem, onClickDeleteItem
}: ColumnsPaymentsProps ): GridColDef<PaymentDetailDTO>[] {
  return [
    {
      field: "totalAmountInCents",
      headerName: "Criação",
      flex: 1,
      valueFormatter: (value) => {
        if (!value) return "-"
        return formatCurrency(value)
      },
    },
    {
      field: "totalInstallments",
      headerName: "Parcelas",
      flex: 1,
    },
    {
      field: "lastExpirationDate",
      headerName: "Ultima data de vencimento",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Ações",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <Stack 
          direction="row" 
          spacing={1} 
          sx={{
            height: "100%",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => onClickSeeItem(params.row)}
          >
            <Tooltip title="Detalhes">
              <GridSearchIcon />
            </Tooltip>
          </IconButton>

          <IconButton
            onClick={() => onClickUpdateItem(params.row.id)}
          >          
            <Tooltip title="Atualizar">
              <GridLoadIcon />
            </Tooltip>
          </IconButton>

          <IconButton
            onClick={() => onClickDeleteItem(params.row)}
          >
            <Tooltip title="Excluir">
              <GridDeleteIcon />
            </Tooltip>
          </IconButton>
        </Stack>
      ),
    }
  ]
}
