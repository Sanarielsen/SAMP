import { GridDeleteIcon, GridLoadIcon, GridSearchIcon, type GridColDef } from "@mui/x-data-grid";

import type { RepresentativeDetails } from "@/features/representative/types/representative";
import { IconButton, Stack, Tooltip } from "@mui/material";

export const columnsRepresentatives: GridColDef<RepresentativeDetails>[] = [
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
    },
    {
      field: "protocol",
      headerName: "Protocolo",
      flex: 1,
      //Coloca o CPF ou RG aqui? Provavel que seja o CPF
      // valueFormatter: (value: string) => {
      //   if (value.length === 11) {
      //     return formatCPF(value)
      //   }

      //   if (value.length === 14) {
      //     return formatCNPJ(value)
      //   }
      // },
    },
    {
      //roleJob tambem...
      field: "titleJob",
      headerName: "Cargo/Funcão",
      flex: 1,
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
            onClick={() => console.log("navega a página de dados", params.row.documentCPF)}
          >
            <Tooltip title="Detalhes">
              <GridSearchIcon />
            </Tooltip>
          </IconButton>

          <IconButton
            onClick={() => console.log("navega a página de detalhe")}
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
  ];