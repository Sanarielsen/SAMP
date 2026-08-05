import { 
  IconButton, 
  Stack, 
  Tooltip 
} from "@mui/material"
import { 
  GridSearchIcon, 
  type GridColDef
} from "@mui/x-data-grid"

import type { ImportedProcess } from "@shared/types/importedProcess";


type ColumnsPublicationProps = {
  onClickSeeItem: (currentItem: ImportedProcess) => void
}

export default function DataTableImportedProcessColumns({
  onClickSeeItem
}: ColumnsPublicationProps): GridColDef<ImportedProcess>[] {
  return [
    {
      field: "processNumber",
      headerName: "Processo",
      flex: 1
    },
    {
      field: "holder",
      headerName: "Titular",
      flex: 1,
    },
    {
      field: "attorney",
      headerName: "Procurador",
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
        </Stack>
      ),
    }
  ]
}