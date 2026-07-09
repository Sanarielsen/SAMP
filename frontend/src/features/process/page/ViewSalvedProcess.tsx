import { useNavigate } from "react-router";

import { Box } from "@mui/material";

import ButtonMenu from "@/components/ButtonMenu";
import DataTable from "@/components/DataTable";
import HeaderPage from "@/components/HeaderPage";


export default function ViewSalvedProcess() {

  const navigate = useNavigate();

  const optionsNewProcess = [
    {
      label: 'Automatica',
      value: 'automatica',
      onClickOption: () => navigate('/processo/automatico')
    },
    {
      label: 'Manual',
      value: 'manual',
      onClickOption: () => navigate('/processo/manual')
    },
  ]

  const stateQuery = "SUCCESS"
  // isSuccess ? "SUCCESS" : 
  // isLoading ? "LOADING" :
  // isError ? "ERROR" : "IDLE";

  return (
    <>
      <Box component="section" sx={{ marginTop: 2 }}>
        <HeaderPage title="Listagem de processos salvos"> 
          <Box
            component="div"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            <ButtonMenu
              label="Cadastrar processo"
              options={optionsNewProcess}
            />
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
    </>
  )
}