import { 
  IconButton, 
  Stack, 
  Tooltip 
} from "@mui/material"
import { 
  GridDeleteIcon, 
  GridLoadIcon, 
  GridSearchIcon, 
  type GridColDef
} from "@mui/x-data-grid"

import { formatDocument } from '@/utils/formatDocument'

import type { Publication, PublicationDetails } from "@shared/types/publication";


type ColumnsPublicationProps = {
  onClickUpdateItem: (id: string) => void
  onClickSeeItem: (currentItem: Publication) => void
  onClickDeleteItem: (currentItem: Publication) => void
}

export default function DataTablePublicationColumns({
  onClickUpdateItem, onClickSeeItem, onClickDeleteItem
}: ColumnsPublicationProps): GridColDef<PublicationDetails>[] {
  return [
    {
      field: "processNumber",
      headerName: "Processo",
      flex: 1
    },
    {
      field: "clientName",
      headerName: "Cliente",
      flex: 1,
      valueGetter: (_, row) =>
        `${row.clientName} - ${formatDocument(row.clientProtocol)}`,
    },
    {
      field: "holder",
      headerName: "Titular",
      flex: 1,
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