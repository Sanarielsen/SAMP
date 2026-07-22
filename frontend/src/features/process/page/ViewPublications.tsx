import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { 
  Box, 
  TextField 
} from "@mui/material";

import { optionsQueryListPublicationDetails } from "@/features/process/api/listPublicationDetails";
import DataTablePublicationColumns from "@/features/process/components/DataTablePublicationColumns";
import ButtonMenu from "@/components/ButtonMenu";
import DataTable from "@/components/DataTable";
import HeaderPage from "@/components/HeaderPage";


export default function ViewPublication() {

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [searchBar, setSearchBar] = useState("");
  const [searchApplied, setSearchApplied] = useState("")

  const { 
    data: listDetailPublications,
    isSuccess,
    isLoading,
    isError,
  } = useQuery(
    optionsQueryListPublicationDetails(searchApplied)
  )

  const optionsNewProcess = [
    {
      label: 'Adicionar publicacão integrada aos processos da importacao',
      value: 'automatica',
      onClickOption: () => navigate('/processo/automatico')
    },
    {
      label: 'Adicionar publicação manualmente',
      value: 'manual',
      onClickOption: () => navigate('/processo/manual')
    },
  ]

  const stateQuery =
    isSuccess ? "SUCCESS" : 
    isLoading ? "LOADING" :
    isError ? "ERROR" : "IDLE";

  return (
    <>
      <Box component="section" sx={{ marginTop: 2 }}>
        <HeaderPage title="Listagem de publicações"> 
          <Box
            component="div"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            <ButtonMenu
              label="Cadastrar processo"
              options={optionsNewProcess}
            />
          </Box>
        </HeaderPage>

        <Box component="section" sx={{ p: 2, px: 4 }}>
          <TextField
            label="Pesquisa na listagem de publicações cadastradas"
            value={searchBar}
            onChange={(e) => setSearchBar(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setSearchApplied(searchBar)
                queryClient.invalidateQueries({ queryKey: ['publications'] })
              }
            }}
            fullWidth
          />
        </Box>

        <Box component="section" sx={{ p: 2, px: 4 }}>
          <DataTable
            state={stateQuery}
            rows={listDetailPublications}
            columns={DataTablePublicationColumns({
              onClickUpdateItem: (id) => navigate(`/processos/publicacao/${id}`),
              onClickSeeItem: (current) => navigate(`/processos/publicacao/detalhe/${current.id}`), 
              onClickDeleteItem: (current) => console.log("Deleta esse recurso: ", current)
            })}
          />
        </Box>
      </Box>
    </>
  )
}