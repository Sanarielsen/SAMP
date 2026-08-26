import { 
  IconButton, 
  Stack, 
  Tooltip,
} from "@mui/material"
import { 
  GridSearchIcon, 
  GridDeleteIcon, 
  GridLoadIcon,
  type GridColDef
} from "@mui/x-data-grid"
import ApartmentIcon from '@mui/icons-material/Apartment';

import type { ImportedProcessWithDetails } from "@shared/types/importedProcess";
import { useAuth } from "@/auth/AuthProvider";


type ColumnsProcessProps = {
  onClickSeeItem: (id: string) => void
  onClickUpdateItem: (id: string) => void,
  onClickDeleteItem: (id: string) => void,
  onClickCheckClient: (currentClientId: string) => void
}

export default function DataTableImportedProcessColumns({
  onClickSeeItem,
  onClickUpdateItem,
  onClickDeleteItem,
  onClickCheckClient
}: ColumnsProcessProps): GridColDef<ImportedProcessWithDetails>[] {

  const { role } = useAuth()
  const isAdmin = role === "ADMIN"

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
      field: "brand",
      headerName: "Marca",
      flex: 1,
    },
    {
      field: "clientName",
      headerName: "Cliente",
      flex: 1,
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
            onClick={() => onClickCheckClient(params.row.clientId)}
          >
            <Tooltip title="Visualizar cliente">
              <ApartmentIcon fontSize="small" />
            </Tooltip>
          </IconButton>

          {isAdmin && (
            <>
              <IconButton
                onClick={() => onClickSeeItem(params.row.id)}
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
                onClick={() => onClickDeleteItem(params.row.id)}
              >
                <Tooltip title="Excluir">
                  <GridDeleteIcon />
                </Tooltip>
              </IconButton>
                </>
              )}
        </Stack>
      ),
    }
  ]
}