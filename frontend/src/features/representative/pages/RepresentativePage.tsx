import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";

import { optionsQueryClient } from "@/features/representative/api/listRepresentatives";
import { columnsRepresentatives } from "@/features/representative/components/DataTableColumnsRepresentatives";
import DataTable from "@/components/DataTable";


export default function RepresentativePage() {

  const [searchBar, setSearchBar] = useState("");
  const [searchApplied, setSearchApplied] = useState("")

  const { 
    data: listRepresentatives,
    isError,
    isSuccess, 
    isLoading,
  } = useQuery(
    optionsQueryClient(String("5d4c6cdb-5138-43fc-b207-cca024742b31"), searchApplied)
  )

  const queryClient = useQueryClient()

  const stateQuery = 
    isSuccess ? "SUCCESS" : 
    isLoading ? "LOADING" :
    isError ? "ERROR" : "IDLE"

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
          <Grid 
            size={{ xs: 12, md: 6 }}
            sx={{ pl: 2 }}
          >
            <Typography variant="h4" component="h1">
              Listagem de representantes
            </Typography>
          </Grid>
          <Grid 
            size={{ xs: 12, md: 6 }}
            sx={{
              pr: 2, textAlign: { xs: "center", md: "right" }
            }}
          >
            <Button
              type="button"
              variant="contained"
              sx={{ width: { xs: "100%", md: "auto" }, }}
              onClick={() => console.log("Muda pra pagina de novo representante")}
            >
              Inserir Novo Representante
            </Button>
          </Grid> 
        </Grid>

        <Box component="section" sx={{ p: 2}}>
          <TextField
            label="Pesquisa na listagem de representantes"
            value={searchBar}
            onChange={(e) => setSearchBar(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setSearchApplied(searchBar)
                queryClient.invalidateQueries({ queryKey: ['representatives'] })
              }
            }}
            fullWidth
          />
        </Box>

        <Box component="section" sx={{ p: 2}}>
          <DataTable
            state={stateQuery}
            rows={listRepresentatives}
            columns={columnsRepresentatives}
          />
        </Box>
      </Box>
    </>
  )
}