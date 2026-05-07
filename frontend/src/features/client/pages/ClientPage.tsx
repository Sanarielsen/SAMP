import { Box, Button, Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { GridDeleteIcon, GridLoadIcon, GridSearchIcon,type GridColDef } from "@mui/x-data-grid";

import DataTable from "@/components/DataTable";
import SearchInput from "@/components/SearchInput";
import { MOCK_CLIENTS } from "@/features/client/utils/mockConstants"
import type { Client } from "@/features/client/types/clients";

// /clients
const rows: Client[] = [
  { 
    id: 1, 
    legalName: "Samuel Henrique",
    type: "Física",
    protocol: "111.222.333-85",
    tradeName: "Sanarielsen",
    fundationDate: new Date()
  },
  { 
    id: 2, 
    legalName: "Abilio Correa",
    type: "Física",
    protocol: "111.222.333-85",
    tradeName: "Sanarielsen 2",
    fundationDate: new Date()
  },
  { 
    id: 3, 
    legalName: "Matilde Aparecida",
    type: "Juridica",
    protocol: "111.222.333-85",
    tradeName: "Sanarielsen 3",
    fundationDate: new Date()
  },
];


const handleView = (client: Client) => {
  // Access an modal to show all information of this client
  console.log(client);
};

const handleEdit = (client: Client) => {
  // Access an page (/clientes/{id}) to update each information If was necessary
  console.log(client);
};

const handleDelete = (id: number) => {
  // Delete a client and update without refresh the current list
  console.log("Delete", id);
};


const columns: GridColDef<Client>[] = [
  {
    field: "legalName",
    headerName: "Razao social",
    flex: 1,
  },
  {
    field: "protocol",
    headerName: "Protocolo",
    flex: 1,
  },
  {
    field: "tradeName",
    headerName: "Nome Fantasia",
    flex: 1,
  },
  {
    field: "fundationDate",
    headerName: "Data de fundacão",
    flex: 1,
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
          onClick={() => handleView(params.row)}
        >
          <Tooltip title="Detalhes">
            <GridSearchIcon />
          </Tooltip>
        </IconButton>

        <IconButton
          onClick={() => handleEdit(params.row)}
        >          
          <Tooltip title="Atualizar">
            <GridLoadIcon />
          </Tooltip>
        </IconButton>

        <IconButton
          onClick={() => handleDelete(params.row.id)}
        >
          <Tooltip title="Excluir">
            <GridDeleteIcon />
          </Tooltip>
        </IconButton>
      </Stack>
    ),
  }
];

export default function ClientPage() {
  return (
    <Box component="section" sx={{ p: 2}}>
      <Grid 
        container 
        spacing={2} 
        sx={{
          textAlign: { xs: "center", md: "left" }
        }}
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" component="h1">
            Listagem de clientes
          </Typography>
        </Grid>
        <Grid 
          size={{ xs: 12, md: 6 }}
          sx={{
            textAlign: { xs: "center", md: "right" }
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{ width: { xs: "100%", md: "auto" }, }}
          >
            Inserir Novo cliente
          </Button>
        </Grid>        
      </Grid>

      <Box component="section" sx={{ p: 2}}>
        <SearchInput
          name="srhClients"
          label="Busque um cliente cadastrado pelo nome"
          data={MOCK_CLIENTS}
        />
      </Box>

      <Box component="section" sx={{ p: 2}}>
        <DataTable
          rows={rows}
          columns={columns}
        />
      </Box>
    </Box>
  )
}