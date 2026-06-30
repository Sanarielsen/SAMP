import { 
  Box, 
  Typography 
} from "@mui/material";
import FeedbackIcon from '@mui/icons-material/Feedback';

interface BoxLoadingProps {
  description: string
}

export default function BoxSuccessWithoutData({
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
      <FeedbackIcon aria-label="Loading…" />
      <Typography variant="body2"> {description} </Typography>
    </Box>
  )
}