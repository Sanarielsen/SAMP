import { 
  Box, 
  Grid, 
  Typography 
} from "@mui/material"


interface HeaderPageProps {
  title: string
  children: React.ReactNode
}

export default function HeaderPage({
  title, children
}: HeaderPageProps) {
  return (
    <Box component="section" sx={{ p: 2 }}>
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
            {title}
          </Typography>
        </Grid>
        <Grid 
          size={{ xs: 12, md: 6 }}
          sx={{
            pr: 2, textAlign: { xs: "center", md: "right" }
          }}
        >
          {children}
        </Grid> 
      </Grid>
    </Box>
  )
}