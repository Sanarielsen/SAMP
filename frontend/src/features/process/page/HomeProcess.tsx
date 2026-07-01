import { useState } from "react";
import { useNavigate } from "react-router";

import { 
  Box, 
  Button, 
  Typography 
} from "@mui/material";

import ModalNewMagazine from "@/features/process/components/ModalNewMagazine";
import HeaderPage from "@/components/HeaderPage";


export default function HomeProcess() {

  const navigate = useNavigate()

  const [modalNewMagazine, setModalNewMagazine] = useState(false);

  return (
    <>
      <Box component="section" sx={{ marginTop: 2 }}>
        <HeaderPage title="Listagem de usuários"> 
          <Typography
            variant="h4"
            component="h1"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            <Button
              sx={{
                m: 2
              }}
              type="submit"
              variant="contained"
              size="large"
              color="warning"
              onClick={() => setModalNewMagazine(true)}
            >
              Importar revista
            </Button>

            <Button
              sx={{
                m: 2
              }}
              type="submit"
              variant="contained"
              size="large"
              color="info"
              onClick={() => navigate('/processos/importacao')}
            >
              Interligar processo
            </Button>

            <Button
              sx={{
                m: 2
              }}
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              onClick={() => navigate('/processo')}
            >
              Cadastrar processo
            </Button>
          </Typography>
        </HeaderPage>
      </Box>

      <ModalNewMagazine
        open={modalNewMagazine}
        onSubmitImport={(action) => {
          console.log("Importado: ", action)
          setModalNewMagazine(false)
        }}
        handleClose={() => setModalNewMagazine(false)}
      />
    </>
  )
}