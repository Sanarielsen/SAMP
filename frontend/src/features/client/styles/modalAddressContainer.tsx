import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const ModalContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  width: "70%",
  maxWidth: "900px",

  maxHeight: "85vh",
  overflowY: "auto",

  backgroundColor: theme.palette.background.paper,

  borderRadius: theme.spacing(2),

  boxShadow: theme.shadows[24],

  padding: theme.spacing(4),

  [theme.breakpoints.down("md")]: {
    width: "85%",
  },

  [theme.breakpoints.down("sm")]: {
    width: "95%",
    maxHeight: "90vh",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
}));