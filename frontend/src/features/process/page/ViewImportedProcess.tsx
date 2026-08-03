import { 
  Box, 
  Grid 
} from "@mui/material";

import ImportedProcessInformation from "@/features/process/components/ImportedProcessInformation";
import ImportedProcessClasses from "@/features/process/components/ImportedProcessClasses";
import ImportedProcessPublications from "@/features/process/components/ImportedProcessPublications";


export default function ViewImportedProcess() {

  return (
    <Box component="section" sx={{ p: 2 }}>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <ImportedProcessInformation />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <ImportedProcessClasses />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <ImportedProcessPublications />
        </Grid>
      </Grid>
    </Box>
  )
}