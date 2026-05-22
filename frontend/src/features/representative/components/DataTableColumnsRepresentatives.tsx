import { GridDeleteIcon, GridLoadIcon, GridSearchIcon, type GridColDef } from "@mui/x-data-grid";
import { IconButton, Stack, Tooltip } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

import { formatDocument } from "@/utils/formatDocument";
import type { RepresentativeDetailsDTO } from "@shared/types/representative";

type ColumnsRepresentativesProps = {
  onClickUpdateItem: (id: string) => void
  onClickSeeItem: (currentItem: RepresentativeDetailsDTO) => void
  onClickDeleteItem: (currentItem: RepresentativeDetailsDTO) => void
  onClickListClientsItem: (currentItem: RepresentativeDetailsDTO) => void
}

export default function DataTableColumnsRepresentative({
  onClickUpdateItem, onClickSeeItem, onClickDeleteItem, onClickListClientsItem
}: ColumnsRepresentativesProps ): GridColDef<RepresentativeDetailsDTO>[] {
  return [
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
    },
    {
      field: "documentCPF",
      headerName: "Documento (CPF)",
      flex: 1,
      valueFormatter: (value: string) => {
        return formatDocument(value)
      },
    },
    {
      field: "titleJob",
      headerName: "Cargo/Função",
      flex: 1,
      valueFormatter: (value: string) => {
        return value
      },
    },
    {
      field: "dataFundation",
      headerName: "Correspondente á",
      flex: 1,
      renderCell: (params) => (
        <IconButton
            onClick={() => onClickListClientsItem(params.row)}
          >
            <Tooltip title="Detalhes">
              <InfoIcon />
            </Tooltip>
          </IconButton>
      )
    },
    {
      field: "actions",
      headerName: "Ações",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <Stack 
          direction="row" 
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
