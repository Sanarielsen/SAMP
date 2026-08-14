import { useQuery } from "@tanstack/react-query";
import { 
  Box, 
  Grid 
} from "@mui/material";

import { optionsQueryGetProcess } from "@/features/process/api/queryGetProcess";
import ImportedProcessInformation from "@/features/process/components/ImportedProcessInformation";
import ImportedProcessPublications from "@/features/process/components/ImportedProcessPublications";
import { useRequiredParam } from "@/hooks/useRequiredParam";


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

        <Grid size={{ xs: 12 }}>
          <ImportedProcessPublications 
            processId={processId}
            processNumber={
              isSuccessProcess ? currentProcess.processNumber : undefined
            }
          />
        </Grid>
      </Grid>
    </Box>
  )
}