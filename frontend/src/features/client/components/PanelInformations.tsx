import { 
  Box, 
  Grid
} from "@mui/material";

import AppointmentInformation from "@/features/client/components/AppointmentInformation";
import ClientInformation from "@/features/client/components/ClientInformation";


export function PanelInformations() {

  return (
    <Box component="section" sx={{ p: 2 }}>
      <Grid
        container 
        spacing={2}
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <ClientInformation />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <AppointmentInformation />
        </Grid>
      </Grid>
    </Box>
  )
}