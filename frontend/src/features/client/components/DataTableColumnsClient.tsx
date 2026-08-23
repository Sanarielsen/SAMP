import { 
  GridDeleteIcon, 
  GridLoadIcon, 
  GridSearchIcon, 
  type GridColDef 
} from "@mui/x-data-grid";
import { 
  IconButton,
  Stack,
  Tooltip, 
} from "@mui/material";

import { formatDocument } from "@/utils/formatDocument";

import type { ClientDetailDTO } from "@shared/types/client";
import { formatDate } from "@/utils/manageDate";


type ColumnsClientProps = {
  onClickUpdateItem: (id: string) => void
  onClickSeeItem: (currentItem: ClientDetailDTO) => void
  onClickDeleteItem: (currentItem: ClientDetailDTO) => void
}

export default function DataTableColumnsClient({
  onClickUpdateItem, onClickSeeItem, onClickDeleteItem
}: ColumnsClientProps ): GridColDef<ClientDetailDTO>[] {
  return [
    {
      field: "legalName",
      headerName: "Razão social",
      flex: 1,
    },
    {
      field: "protocol",
      headerName: "Protocolo",
      flex: 1,
      valueFormatter: (value: string) => {
        return formatDocument(value)
      },
    },
        {
      field: "tradeName",
      headerName: "Nome Fantasia",
      flex: 1,
    },
    {
      field: "dataFundation",
      headerName: "Data de fundação",
      flex: 1,
      valueFormatter: (value) => {
        if (!value) return "-"
        return formatDate(value)
      },
    },
    {
      field: "actions",
      headerName: "Ações",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <Stack direction="row" 
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
