import { Box, Button, Grid, TextField, Typography } from "@mui/material";

import ApartmentIcon from '@mui/icons-material/Apartment';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function UpdateClientPage() {

  function handleSubmitNewClient() {

  }

  return (
    <form onSubmit={() => handleSubmitNewClient()}>
      <Box component="section" sx={{ p: 8 }}>
        <Grid
          container 
          spacing={4} 
          sx={{
            textAlign: { xs: "center", md: "left" }
          }}
        >
          <Grid 
            size={{ xs: 12}}
            sx={{
              textAlign:"center"
            }}
          >
            <Typography variant="h4" component="h1">
              Adicionar novo cliente
            </Typography>
          </Grid>

          <Grid 
            size={{ xs: 12}}
            sx={{
              textAlign:"center"
            }}
          >
            <ApartmentIcon fontSize="large" />
          </Grid>    
        </Grid>

        <Grid container spacing={4} sx={{ pt: 8, pb: 3 }}>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextField 
              variant="outlined"
              id="itLegalName"
              label="Razao Social"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextField 
              variant="outlined"
              id="itTradeName"
              label="Nome Fantasia"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextField 
              variant="outlined"
              id="itType"
              label="Tipo de cliente"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField 
              variant="outlined"
              id="itProtocol"
              label="Documento"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
            <TextField 
              variant="outlined"
              id="itProtocol"
              label="Data de Fundacão"
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ py: 2 }}>
          <Grid size={{ xs: 11, sm: 11 }}>
            <TextField 
              variant="outlined"
              id="itLocationAddress"
              label="Endereco de localizacão"
              fullWidth
            />          
          </Grid>
          <Grid size={{ xs: 1, sm: 1 }} sx={{ display: 'flex', alignItems: 'center' }}>
            <ContentCopyIcon fontSize="large" />
          </Grid>
        </Grid>
        
        <Grid container spacing={4} sx={{ py: 3 }}>
          <Grid size={{ xs: 11, sm: 11 }}>
            <TextField 
              variant="outlined"
              id="itLocationAddress"
              label="Endereco de correspondencia"
              fullWidth
            />          
          </Grid>
          <Grid size={{ xs: 1, sm: 1 }} sx={{ display: 'flex', alignItems: 'center' }}>
            <ContentCopyIcon fontSize="large" />
          </Grid>
        </Grid>
        
        <Grid container spacing={4} sx={{ py: 2 }}>
          <Grid size={{ xs: 12, lg: 4 }} 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography variant="h5" component="h5">
              Informacões de contato:
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextField 
              variant="outlined"
              id="itNameContact"
              label="Nome"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextField 
              variant="outlined"
              id="itNumberContact"
              label="Contato"
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} >
          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Entrar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}