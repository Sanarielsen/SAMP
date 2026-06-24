import { useNavigate, useParams } from "react-router";

import { Button } from "@mui/material"

import HeaderPage from "@/components/HeaderPage"


export default function AppointmentInformation() {

  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <HeaderPage title="Agenda">
      <Button
        type="button"
        variant="contained"
        sx={{ 
          width: { xs: "100%", md: "auto" },
          "&:hover": {
            backgroundColor: "#7A3000",
          },
        }}
        color="secondary"
        onClick={() => navigate(`/cliente/${id}/agenda`)}
      >
        Cadastrar
      </Button>
    </HeaderPage>
  )
}