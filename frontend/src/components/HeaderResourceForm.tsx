import { 
  Grid, 
  Typography 
} from "@mui/material";

import AllInboxIcon from '@mui/icons-material/AllInbox';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HotelClassIcon from '@mui/icons-material/HotelClass';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PriceChangeIcon from '@mui/icons-material/PriceChange';

import type { Section } from "@/types/section";


interface HeaderResourceFormProps {
  title: string,
  resource: Section,
  subtitle?: string,
}

export default function HeaderResourceForm({
  title, resource, subtitle,
}: HeaderResourceFormProps) {
  return (
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
          {title}
        </Typography>
      </Grid>

      <Grid 
        size={{ xs: 12}}
        sx={{
          textAlign:"center"
        }}
      >
        { resource === "CLIENTS" ? (
          <ApartmentIcon fontSize="large" />
        ) : resource === "REPRESENTATIVES" ? (
          <HotelClassIcon fontSize="large" />
        ) : resource === "ORDERS" ? (
          <AllInboxIcon fontSize="large" />
        ) : resource === "PAYMENTS" ? (
          <PriceChangeIcon fontSize="large" />
        ) : resource === "INSTALLMENTS" ? (
          <InsertDriveFileIcon fontSize="large" />
        ) : resource === "APPOINTMENTS" ? (
          <CalendarMonthIcon fontSize="large" />
        ) : resource === "PROCESSES" ? (
          <InsertDriveFileIcon fontSize="large" />
        ) : resource === "ABOUT" ? (
          <img src="/samp_logo.svg" width="48" height="48" />
        ) : ( 
          <></>
        )}
        
      </Grid>

      <Grid 
        size={{ xs: 12}}
        sx={{
          textAlign:"center"
        }}
      >
        <Typography variant="caption" color="text.secondary">
          { !subtitle ? (
            <>
              Todos os campos com * são obrigatórios
            </>
          ) : subtitle }
          
        </Typography>
      </Grid>
    </Grid>
  )
}