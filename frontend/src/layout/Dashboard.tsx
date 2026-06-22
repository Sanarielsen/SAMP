import { Outlet } from "react-router";
import { Grid, useMediaQuery, useTheme } from "@mui/material";

import Menu from "@/components/Menu";
import HeaderMenu from "@/components/HeaderMenu";

export default function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobile) {
    return (
      <div>      
        <HeaderMenu isMobile={true} />
        <main>
          <Outlet />
        </main>
      </div>
    )
  }

  return (
    <Grid container sx={{ height: "100vh", overflow: "hidden" }}>
      <Grid size={{ sm: 12, md: 4, lg: 3, xl: 2 }}>
        <Menu open={true} isMobile={false} handleChangeStatus={() => {}} />
      </Grid>

      <Grid
        size={{ sm: 12, md: 8, lg: 9, xl: 10 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          height: "100%",
        }}
      >
        <HeaderMenu isMobile={false} />

        <main style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
          <Outlet />
        </main>
      </Grid>
    </Grid>
  );
}