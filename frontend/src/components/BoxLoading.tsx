import { 
  Box, 
  CircularProgress, 
  Typography 
} from "@mui/material";

interface BoxLoadingProps {
  description: string
}

export default function BoxLoading({
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
      <CircularProgress aria-label="Loading…" />
      <Typography variant="body2"> {description} </Typography>
    </Box>
  )
}