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
import FeedbackIcon from '@mui/icons-material/Feedback';

import type { ProcessPublication } from "@shared/types/processPublication";
import { formatDate } from "@/utils/formatDateCode";


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
      field: "dispatch",
      headerName: "Despacho",
      flex: 1,
      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={1}
          sx={{ height: "100%" }}
        >
          {params.row.dispatch}

          {params.row.complement && (
            <Tooltip title={params.row.complement}>
              <FeedbackIcon fontSize="small" />
            </Tooltip>
          )}
        </Stack>
      ),
    },
    {
      field: "publicationDate",
      headerName: "Data de publicacão",
      flex: 1,
      valueFormatter: (value) => {
        if (!value) return "-"
        return formatDate(value);
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