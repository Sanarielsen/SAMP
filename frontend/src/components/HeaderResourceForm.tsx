import { Grid, Typography } from "@mui/material";

import AllInboxIcon from '@mui/icons-material/AllInbox';
import PriceChangeIcon from '@mui/icons-material/PriceChange';

import type { Section } from "@/types/section";

interface HeaderResourceFormProps {
  title: string,
  resource: Section,
}

export default function HeaderResourceForm({
  title, resource
}: HeaderResourceFormProps) {
  return (
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
          {title}
        </Typography>
      </Grid>

      <Grid 
        size={{ xs: 12}}
        sx={{
          textAlign:"center"
        }}
      >
        { resource === "PAYMENTS" ? (
          <AllInboxIcon fontSize="large" />
        ) 
        : resource === "INSTALLMENTS" ? (
          <PriceChangeIcon fontSize="large" />
        ) : (
          <> ICONE </>
        )}
        
      </Grid>
    </Grid>
  )
}