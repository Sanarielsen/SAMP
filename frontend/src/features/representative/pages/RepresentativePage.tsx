import { Box, Button, Grid, TextField, Typography } from "@mui/material";

import { columnsRepresentatives } from "@/features/representative/components/DataTableColumnsRepresentatives";
import DataTable from "@/components/DataTable";


export default function RepresentativePage() {
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
            value={null}
            onChange={() => console.log("Texto mudou")}
            onKeyDown={() => {
              // if (e.key === 'Enter') {
              //   setSearchApplied(searchBar)
              //   queryClient.invalidateQueries({ queryKey: ['clients'] })
              // }
            }}
            fullWidth
          />
        </Box>

        <Box component="section" sx={{ p: 2}}>
          <DataTable
            state={"SUCCESS"}
            rows={[]}
            columns={columnsRepresentatives}
          />
        </Box>
      </Box>
    </>
  )
}