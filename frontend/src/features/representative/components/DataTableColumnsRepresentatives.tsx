import { GridDeleteIcon, GridLoadIcon, GridSearchIcon, type GridColDef } from "@mui/x-data-grid";
import { IconButton, Stack, Tooltip } from "@mui/material";

import { formatDocument } from "@/features/client/utils/formatDocument";
import type { RepresentativeDetailsDTO } from "@shared/types/representative";

type ColumnsRepresentativesProps = {
  onClickUpdateItem: (id: string) => void
  onClickSeeItem: (currentItem: RepresentativeDetailsDTO) => void
}

export default function DataTableColumnsRepresentative({
  onClickUpdateItem, onClickSeeItem
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
      //roleJob tambem...
      field: "titleJob",
      headerName: "Cargo/Funcão",
      flex: 1,
      valueFormatter: (value: string) => {
        return value
      },
    },
    {
      //Como colocar a empresa que ele corresponde aqui
      //E se ele tiver mais de uma...
      field: "dataFundation",
      headerName: "Correspondente á",
      flex: 1,
      valueFormatter: (value) => {
        if (!value) return "-"
        return new Date(value).toLocaleDateString("pt-BR")
      },
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
            onClick={() => console.log("navega a página de exclusao")}
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
