import { 
  Box, 
  Grid 
} from "@mui/material";

import ImportedProcessInformation from "@/features/process/components/ImportedProcessInformation";
import ImportedProcessClasses from "@/features/process/components/ImportedProcessClasses";
import ImportedProcessPublications from "@/features/process/components/ImportedProcessPublications";
import { optionsQueryGetProcess } from "../api/queryGetProcess";
import { useRequiredParam } from "@/hooks/useRequiredParam";
import { useQuery } from "@tanstack/react-query";


export default function ViewImportedProcess() {

  const processId = useRequiredParam('id')

  const {
    data: currentProcess,
    isSuccess: isSuccessProcess
  } = useQuery(optionsQueryGetProcess(processId!))

  return (
    <Box component="section" sx={{ p: 2 }}>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <ImportedProcessInformation data={
            isSuccessProcess ? currentProcess : undefined
          } />
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