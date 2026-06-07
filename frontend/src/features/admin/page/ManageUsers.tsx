import { useState } from "react";
import { useNavigate } from "react-router";
import { 
  useQuery, 
  useQueryClient 
} from "@tanstack/react-query";

import { 
  Box,
  Button, 
  TextField, 
  Typography 
} from "@mui/material";

import { optionsQueryListUsers } from "@/features/admin/api/queryListUser";
import DataTableColumnsUsers from "@/features/admin/components/DataTableColumnsUsers";

import DataTable from "@/components/DataTable";
import HeaderPage from "@/components/HeaderPage";

import type { UserDetailDTO } from "@shared/types/user";


export default function ManageUsers() {

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [searchBar, setSearchBar] = useState("");
  const [searchApplied, setSearchApplied] = useState("")

  const { 
    data: listUsers,
    isError,
    isSuccess, 
    isLoading,
    //refetch
  } = useQuery(
    optionsQueryListUsers(searchApplied)
  )

  const stateQuery =
    isSuccess ? "SUCCESS" : 
    isLoading ? "LOADING" :
    isError ? "ERROR" : "IDLE";

  function handleView(current: UserDetailDTO) {
    console.log("Usuário selecionado: ", current)
  }

  function handleDelete(current: UserDetailDTO) {
    console.log("Usuário selecionado: ", current)
  }

  return (
    <>
      <Box component="section" sx={{ marginTop: 2 }}>
        <HeaderPage title="Listagem de usuários"> 
          <Typography 
            variant="h4"
            component="h1"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="error"
            >
              Adicionar usuário
            </Button>
          </Typography>
        </HeaderPage>
      </Box>

      <Box component="section" sx={{ py: 2, px: 4}}>
        <TextField
          label="Pesquisa dos usuários"
          placeholder="Pesquisa na listagem dos usuários cadastrados"
          value={searchBar}
          onChange={(e) => setSearchBar(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSearchApplied(searchBar)
              queryClient.invalidateQueries({ queryKey: ['orders'] })
            }
          }}
          fullWidth
        />
      </Box>

      <Box component="section" sx={{ py: 2, px: 4}}>
        <DataTable
          state={stateQuery}
          rows={listUsers}
          columns={DataTableColumnsUsers({
            onClickUpdateItem: (id) => navigate(`/os/${id}`),
            onClickViewItem: (current) => handleView(current), 
            onClickDeleteItem: (current) => handleDelete(current),
          })}
        />
      </Box>
    </>
  )
}
