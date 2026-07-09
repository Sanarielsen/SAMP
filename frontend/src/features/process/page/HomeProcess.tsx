import { useState } from "react";
import { useNavigate } from "react-router";

import { 
  Box, 
  Button, 
  Typography 
} from "@mui/material";

import ModalNewMagazine from "@/features/process/components/ModalNewMagazine";
import HeaderPage from "@/components/HeaderPage";
import ToastContainer from "@/components/Toast";


export default function HomeProcess() {

  const navigate = useNavigate()

  const [openToast, setOpenToast] = useState("")
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
          setOpenToast(action);
          setModalNewMagazine(false)
        }}
        handleClose={() => setModalNewMagazine(false)}
      />

      <ToastContainer
        open={openToast === "success"}
        message="Revista importada com sucesso. Verifique essa revista na listagem de processos."
        severity="success"
        onClose={() => setOpenToast("")}
      />

      <ToastContainer
        open={openToast === "warning"}
        message="Essa importação já foi executada, verifique seus dados na listagem dos processos."
        severity="warning"
        onClose={() => setOpenToast("")}
      />

      <ToastContainer
        open={openToast === "error"}
        message="Ocorreu um erro ao importar essa revista."
        severity="error"
        onClose={() => setOpenToast("")}
      />
    </>
  )
}