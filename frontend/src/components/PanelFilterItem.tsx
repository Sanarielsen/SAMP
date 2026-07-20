import { Grid } from "@mui/material";
import { type ReactNode } from "react";

interface PanelFilterItemProps {
  children: ReactNode;
}

export default function PanelFilterItem({ children }: PanelFilterItemProps) {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      {children}
    </Grid>
  );
}