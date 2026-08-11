import { formatAsVisualOnlyDate } from "@/utils/formatAsAVisualDate";
import { 
  IconButton, 
  Stack, 
  Tooltip,
} from "@mui/material"
import { 
  GridSearchIcon, 
  GridDeleteIcon,
  type GridColDef
} from "@mui/x-data-grid"

import type { ProcessPublication } from "@shared/types/processPublication";


type ColumnsPublicationsProps = {
  onClickSeeItem: (currentItem: ProcessPublication) => void,
  onClickDeleteItem: (id: string) => void,
}

export default function DataTableProcessPublicationColumns({
  onClickSeeItem,
  onClickDeleteItem
}: ColumnsPublicationsProps): GridColDef<ProcessPublication>[] {
  return [
    {
      field: "magazineNumber",
      headerName: "Revista",
      flex: 1
    },
    {
      field: "publicationDate",
      headerName: "Data de publicacão",
      flex: 1,
      valueFormatter: (value) => {
        if (!value) return "-"
        return formatAsVisualOnlyDate(value)
      },
    },
    {
      field: "actions",
      headerName: "Ações",
      sortable: false,
      width: 200,
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
            onClick={() => onClickDeleteItem(params.row.id)}
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