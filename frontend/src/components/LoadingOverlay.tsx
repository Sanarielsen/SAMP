import { 
  Backdrop, 
  CircularProgress, 
  Typography, 
  Box 
} from "@mui/material";


type LoadingOverlayProps = {
  open: boolean;
  message?: string;
};

export default function LoadingOverlay({
  open,
  message = "Processing...",
}: LoadingOverlayProps) {
  return (
    <Backdrop
      open={open}
      sx={(theme) => ({
        color: "#fff",
        zIndex: theme.zIndex.modal + 1,
      })}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CircularProgress color="inherit" />

        <Typography color="inherit">
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
}