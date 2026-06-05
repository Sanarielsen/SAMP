import { 
  Box, 
  Grid
} from "@mui/material";

import OrderInformation from "@/features/order/components/OrderInformation";
import PaymentInformation from "@/features/order/components/PaymentInformation";

export function DetailsPanel() {
  return (
    <Box component="section" sx={{ p: 2 }}>
      <Grid
        container 
        spacing={2}
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <OrderInformation />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <PaymentInformation />
        </Grid>
      </Grid>
    </Box>
  )
}