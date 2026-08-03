import { 
  Box, 
  Grid
} from "@mui/material";

import GroupText from "@/components/GroupText";
import GroupTextDate from "@/components/GroupTextDate";
import HeaderPage from "@/components/HeaderPage";
import { importedProcessInformation } from "@/features/process/utils/getMockImportedProcessInformation";


export default function ImportedProcessInformation() {
  return (
    <Box component="section" sx={{ px: 2 }}>
      <HeaderPage title="Dados do processo" />

      {/* 
        //Campos correspondente a esse processo
        //numberProcess
        //brand
        //status
        //presentation
        //nature
        //numberMagazine
        //refreshedByMagazine
        //createdAt
        //updatedAt
        //deletedAt
      */}

      <Grid container spacing={2}>

        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <GroupText
            title="Número:"
            value={importedProcessInformation.processNumber}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 9 }}>
          <GroupText
            title="Status:"
            value={importedProcessInformation.status}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 2 }}>
          <GroupText
            title="Apresentação:"
            value={importedProcessInformation.presentation}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <GroupText
            title="Natureza:"
            value={importedProcessInformation.nature}
          />
        </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 8 }}>
          <GroupText
            title="Marca:"
            value={importedProcessInformation.brand}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <GroupText
            title="Revista:"
            value={importedProcessInformation.magazineNumber}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <GroupTextDate
            title="Atualizado na revista:"
            value={importedProcessInformation.updatedAtByMagazine}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <GroupTextDate
            title="Criado:"
            value={importedProcessInformation.createdAt}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <GroupTextDate
            title="Atualizado:"
            value={importedProcessInformation.updatedAt}
          />
        </Grid>
      </Grid>
    </Box>
  )
}