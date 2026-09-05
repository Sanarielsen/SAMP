import { 
  Box, 
  Grid, 
} from "@mui/material";

import SectionBlock from "@/features/about/components/SectionBlock";
import HeaderResourceForm from "@/components/HeaderResourceForm";


export default function AboutPage() {
  return ( 
    <Box component="section" sx={{ p: 8 }}>
      <HeaderResourceForm 
        title="Sobre o sistema"
        resource="ABOUT"
        subtitle="Detalhes sobre o sistema"
      />
      <Grid container spacing={4} sx={{ pt: 8, pb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: 'center' }}>
          <SectionBlock
            title="Sistema"
            subtitle="SAMP: Sistema de automatizacao de marcas e patentes"
          />

          <SectionBlock
            title="Versão"
            subtitle="v1.1.2"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: 'center' }}>

          <SectionBlock
            title="Desenvolvido por"
            subtitle="@Sanarielsen"
            redirect="https://github.com/Sanarielsen"
          />
        </Grid>
      </Grid>
    </Box>
  )
}