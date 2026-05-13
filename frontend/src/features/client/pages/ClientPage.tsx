import { 
  Box, 
  Button, 
  Grid, 
  IconButton, 
  Stack, 
  Tooltip, 
  Typography } from "@mui/material";
import { 
  GridDeleteIcon, 
  GridLoadIcon, 
  GridSearchIcon,
  type GridColDef 
} from "@mui/x-data-grid";
import { useNavigate } from "react-router";

import DataTable from "@/components/DataTable";
import SearchInput from "@/components/SearchInput";
import { MOCK_CLIENTS } from "@/features/client/utils/mockConstants"
import type { Client } from "@/features/client/types/clients";
import { useQuery } from "@tanstack/react-query";
import { optionsQueryClient } from "../api/queryClients";
import { formatCPF } from "@/utils/formatCPF";
import { formatCNPJ } from "@/utils/formatCNPJ";
import { useAuth } from "@/auth/AuthProvider";
import { useState } from "react";
import ModalClientDetails from "../components/ModalClientDetails";
import { clientFields } from "../utils/getRowDetailClient";


export default function ClientPage() {
  
  const navigate = useNavigate();
  const { getUserId } = useAuth();

  const userId = getUserId()

  const [clientClicked, setClientClicked] = useState<Client>();
  const [openModalDetails, setOpenModalDetails] = useState(false);

  const handleView = (client: Client) => {
    setClientClicked(client);
    setOpenModalDetails(true);
  };

  const handleDelete = (id: number) => {
    // Delete a client and update without refresh the current list
    console.log("Delete", id);
  };

  const { 
    data: listClients, 
    isError,
    isSuccess, 
    isLoading
  } = useQuery(
    optionsQueryClient(String(userId))
  )

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
      valueFormatter: (value: string) => {
        if (value.length === 11) {
          return formatCPF(value)
        }

        if (value.length === 14) {
          return formatCNPJ(value)
        }
      },
    },
    {
      field: "tradeName",
      headerName: "Nome Fantasia",
      flex: 1,
    },
    {
      field: "dataFundation",
      headerName: "Data de fundacão",
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
            onClick={() => handleView(params.row)}
          >
            <Tooltip title="Detalhes">
              <GridSearchIcon />
            </Tooltip>
          </IconButton>

          <IconButton
            onClick={() => navigate(`/cliente/${params.id}`)}
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

  return (
    <>
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
              type="button"
              variant="contained"
              sx={{ width: { xs: "100%", md: "auto" }, }}
              onClick={() => navigate("/cliente")}
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
            state={
              isSuccess ? "SUCCESS" : 
              isLoading ? "LOADING" :
              isError ? "ERROR" : "IDLE"
            }
            rows={listClients ?? []}
            columns={columns}
          />
        </Box>
      </Box>

      {clientClicked && (
        <ModalClientDetails 
          open={openModalDetails}
          client={clientClicked}
          fields={clientFields}
          handleClose={() => setOpenModalDetails(false)}
        />
      )}

      
    </>
  )
}