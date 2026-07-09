import { useState } from "react";

import { Box, Button } from "@mui/material";

import ModalNewMagazine from "@/features/process/components/ModalNewMagazine";
import DataTable from "@/components/DataTable";
import HeaderPage from "@/components/HeaderPage";
import ToastContainer from "@/components/Toast";


export default function ViewImportedMagazine() {

  const [openToast, setOpenToast] = useState("")
  const [modalNewMagazine, setModalNewMagazine] = useState(false);

  const stateQuery = "SUCCESS"
    // isSuccess ? "SUCCESS" : 
    // isLoading ? "LOADING" :
    // isError ? "ERROR" : "IDLE";

  return (
    <>
      <Box component="section" sx={{ marginTop: 2 }}>
        <HeaderPage title="Listagem das revistas importadas"> 
          <Box
            component="div"
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
          </Box>
        </HeaderPage>

        <Box component="section" sx={{ p: 2}}>
          <DataTable
            state={stateQuery}
            rows={[]}
            columns={[]}
          />
        </Box>
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