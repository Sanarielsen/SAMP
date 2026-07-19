import { type ReactNode } from "react";
import { Grid, Paper, Typography } from "@mui/material";

interface PanelFilterGroupProps {
  title: string;
  children: ReactNode;
}

export default function PanelFilterGroup({
  title,
  children,
}: PanelFilterGroupProps) {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      <Grid container spacing={2}>
        {children}
      </Grid>
    </Paper>
  );
}