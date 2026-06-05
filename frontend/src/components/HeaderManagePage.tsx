import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { Box, Grid, Typography } from "@mui/material";

import { type ManageAction } from '@/types/action';

interface HeaderManagePageProps {
  title: string
  action: ManageAction
}

export default function HeaderManagePage({
  title, action
}: HeaderManagePageProps) {
  return (
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
            { title }
          </Typography>
        </Grid>

        <Grid 
          size={{ xs: 12}}
          sx={{
            textAlign:"center"
          }}
        >
          {
            action === "ADD" ? (
              <FiberNewIcon fontSize="large" />
            ) : (
              <ReplayCircleFilledIcon fontSize="large" />
            )
          }
        </Grid>
      </Grid>
    </Box>
  )
}