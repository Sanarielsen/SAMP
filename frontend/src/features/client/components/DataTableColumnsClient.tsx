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

import { formatCPF } from "@/utils/formatCPF";
import { formatCNPJ } from "@/utils/formatCNPJ";

import type { ClientDetailDTO } from "@shared/types/client";


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
        if (value.length === 11) {
          return formatCPF(value)
        }

        if (value.length === 14) {
          return formatCNPJ(value)
        }
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
        return new Date(value).toLocaleDateString("pt-BR")
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
