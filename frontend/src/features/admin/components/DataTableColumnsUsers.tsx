import { 
  GridDeleteIcon, 
  GridLoadIcon, 
  GridSearchIcon, 
  type GridColDef, 
  type GridRenderCellParams 
} from "@mui/x-data-grid";
import { 
  IconButton, 
  Stack, 
  Tooltip,
} from "@mui/material";
import LockResetIcon from '@mui/icons-material/LockReset';
import dayjs from "dayjs";

import type { UserDetailsForAdminDTO } from "@shared/types/user";


interface DataTableColumnsUsersProps {
  onClickUpdatePasswordItem: (id: string) => void
  onClickUpdateItem: (id: string) => void
  onClickViewItem: (item: UserDetailsForAdminDTO) => void
  onClickDeleteItem: (item: UserDetailsForAdminDTO) => void
}

export default function DataTableColumnsUsers({
  onClickUpdateItem, onClickUpdatePasswordItem, onClickViewItem, onClickDeleteItem
}: DataTableColumnsUsersProps): GridColDef<UserDetailsForAdminDTO>[] {
  return [
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
    },
    {
      field: "email",
      headerName: "E-mail",
      flex: 1,
    },
    {
      field: "userRoleName",
      headerName: "Cargo",
      flex: 1,
    },
    {
      field: "validated", 
      headerName: "Valido",
      renderCell: (params:  GridRenderCellParams<UserDetailsForAdminDTO>) => {
        if (params.row.validated) {
          return 'Sim'
        } 
        return 'Não'
      },
    },
    {
      field: "updatedAt",
      headerName: "Atualizado em",
      flex: 1,
      valueGetter: (_: unknown, row: UserDetailsForAdminDTO) => {
        return row.updatedAt ?? row.createdAt;
      },
      renderCell: (params: GridRenderCellParams<UserDetailsForAdminDTO, Date>) => {
        return dayjs(params.value).format("DD/MM/YYYY HH:mm")
      },
    },
    {
      field: "actions",
      headerName: "Ações",
      sortable: false,
      flex: 1,
      renderCell: (params: GridRenderCellParams<UserDetailsForAdminDTO>) => (
        <Stack
          direction="row" 
          spacing={1} 
          sx={{
            height: "100%",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => onClickViewItem(params.row)}
          >
            <Tooltip title="Detalhes">
              <GridSearchIcon />
            </Tooltip>
          </IconButton>

          <IconButton
            onClick={() => onClickUpdatePasswordItem(params.row.id)}
          >          
            <Tooltip title="Atualizar a senha">
              <LockResetIcon />
              
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
      )
    }
  ]
}