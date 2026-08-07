import { useNavigate } from "react-router";

import { 
  Box, 
  Button, 
  Grid
} from "@mui/material";

import GroupText from "@/components/GroupText";
import GroupTextDate from "@/components/GroupTextDate";
import HeaderPage from "@/components/HeaderPage";

import type { ImportedProcess } from "@shared/types/importedProcess";


interface ImportedProcessInformationProps {
  data: ImportedProcess | undefined
}

export default function ImportedProcessInformation({
  data
}: ImportedProcessInformationProps) {

  const navigate = useNavigate();

  return (
    <Box component="section" sx={{ px: 2 }}>
      <HeaderPage title="Dados do processo">
        <Button
          type="button"
          variant="contained"
          sx={{ 
            width: { xs: "100%", md: "auto" },
            "&:hover": {
              backgroundColor: "#7A3000",
            },
          }}
          color="secondary"
          onClick={() => navigate(`/processo/${data.id}`)}
        >
          Atualizar
        </Button>
      </HeaderPage>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <GroupText
            title="Número:"
            value={data.processNumber}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 9 }}>
          <GroupText
            title="Status:"
            value={data.processStatus}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 3 }}>
          <GroupText
            title="Apresentação:"
            value={data.presentation}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <GroupText
            title="Natureza:"
            value={data.nature}
          />
        </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
          <GroupText
            title="Marca:"
            value={data.brand}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <GroupText
            title="Revista:"
            value={data.processMagazine}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <GroupTextDate
            title="Criado:"
            value={data.createdAt}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <GroupTextDate
            title="Atualizado:"
            value={data.updatedAt}
          />
        </Grid>
      </Grid>
    </Box>
  )
}