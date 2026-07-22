import { 
  IconButton, 
  Stack, 
  Tooltip 
} from "@mui/material";
import { 
  GridDeleteIcon, 
  type GridColDef 
} from "@mui/x-data-grid";

import { formatDateTimeBrazil } from "@/utils/formatDateTimeBrazil";

import type { ProcessHistoryDetailDTO } from "@shared/types/processHistory";


type ColumnsProcessHistoryProps = {
  onClickDeleteItem: (currentItem: ProcessHistoryDetailDTO) => void
}

export default function DataTableProcessHistoryColumns({
  onClickDeleteItem
}: ColumnsProcessHistoryProps): GridColDef<ProcessHistoryDetailDTO>[] {
  return [
    {
      field: "numberMagazine",
      headerName: "Revista",
      flex: 1
    },
    {
      field: "categoryName",
      headerName: "Categoria",
      flex: 1,
    },
    {
      field: "fileName",
      headerName: "Arquivo gerado",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Data de exportação",
      flex: 1,
      valueFormatter: (value) => formatDateTimeBrazil(value),
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