import { 
  Box, 
  Typography
} from "@mui/material";

import ErrorIcon from '@mui/icons-material/Error';


interface BoxErrorProps {
  description: string
}

export default function BoxError({
  description
}: BoxErrorProps) {
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
      <ErrorIcon aria-label="Error" />
      <Typography variant="body2"> {description} </Typography>
    </Box>
  )
}