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
import { formatDate } from "@/utils/manageDate";


interface OrderDetailDTO {
  id:           string

  clientId?:    string
  orderTypeId?: number
  observation?: string
  eventDate?:   Date

  createdAt:    Date
  updatedAt:    Date | null
  deletedAt:    Date | null
}

type ColumnsOrdersProps = {
  onClickUpdateItem: (id: string) => void
  onClickSeeItem: (currentItem: OrderDetailDTO) => void
  onClickDeleteItem: (currentItem: OrderDetailDTO) => void
}

export default function DataTableColumnsOrder({
  onClickUpdateItem, onClickSeeItem, onClickDeleteItem
}: ColumnsOrdersProps ): GridColDef<OrderDetailDTO>[] {
  return [
    {
      field: "orderTypeTitle",
      headerName: "Titulo",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Descrição",
      flex: 1,
    },
    {
      field: "eventDate",
      headerName: "Criação",
      flex: 1,
      valueFormatter: (value) => {
        if (!value) return "-"
        return formatDate(value)
      },
    },
    {
      field: "clientName",
      headerName: "Solicitado por: ",
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
