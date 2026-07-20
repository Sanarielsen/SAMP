import { 
  Box,
  Typography 
} from "@mui/material";
import PanToolIcon from '@mui/icons-material/PanTool';

interface BoxLoadingProps {
  description: string
}

export default function BoxIdle({
  description
}: BoxLoadingProps) {
  return (
    <Box 
      sx={{ 
        height: 200, 
        width: "100%", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        gap: 4
      }}
    >
      <PanToolIcon aria-label="Loading…" />
      <Typography variant="body2"> {description} </Typography>
    </Box>
  )
}