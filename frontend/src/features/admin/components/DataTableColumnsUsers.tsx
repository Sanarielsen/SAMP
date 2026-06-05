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
  Tooltip 
} from "@mui/material";
import dayjs from "dayjs";

import type { UserDetailDTO } from "@shared/types/user";


interface DataTableColumnsUsersProps {
  onClickUpdateItem: (id: string) => void
  onClickViewItem: (item: UserDetailDTO) => void
  onClickDeleteItem: (item: UserDetailDTO) => void
}

export default function DataTableColumnsUsers({
  onClickUpdateItem, onClickViewItem, onClickDeleteItem
}: DataTableColumnsUsersProps): GridColDef<UserDetailDTO>[] {
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
      field: "roleName",
      headerName: "Cargo",
      flex: 1,
    },
    {
      field: "updatedAt",
      headerName: "Atualizado em",
      flex: 1,
      valueGetter: (_: unknown, row: UserDetailDTO) => {
        return row.updatedAt ?? row.createdAt;
      },
      renderCell: (params: GridRenderCellParams<UserDetailDTO, Date>) => {
        return dayjs(params.value).format("DD/MM/YYYY HH:mm")
      },
    },
    {
      field: "actions",
      headerName: "Ações",
      sortable: false,
      flex: 1,
      renderCell: (params: GridRenderCellParams<UserDetailDTO>) => (
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