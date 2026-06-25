import { formatDateTimeBrazil } from "@/utils/formatDateTimeBrazil"
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
import InfoIcon from '@mui/icons-material/Info';

import type { Appointment } from "@shared/types/appointment"


type ColumnsAppointmentProps = {
  onClickUpdateItem: (id: string) => void
  onClickSeeItem: (currentItem: Appointment) => void
  onClickDeleteItem: (currentItem: Appointment) => void
  onClickCheckOrder: (orderId: string) => void
}

export default function DataTableAppointmentColumns({
  onClickUpdateItem, onClickSeeItem, onClickDeleteItem, onClickCheckOrder
}: ColumnsAppointmentProps): GridColDef<Appointment>[] {
    return [{
      field: "appointmentAt",
      headerName: "Data da agenda",
      flex: 1,
      valueFormatter: (value) => formatDateTimeBrazil(value),
    },
    {
      field: "description",
      headerName: "Descrição",
      flex: 1,
    },
    {
      field: "orderId",
      headerName: "O.S",
      flex: 1,
      renderCell: (params) => {
        const orderId = params.row.orderId;

        if (!orderId) return "Nenhuma O.S atrelada";

        return (
          <Tooltip title="Acessar O.S dessa agenda">
            <IconButton onClick={() => onClickCheckOrder(orderId)}>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        );
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