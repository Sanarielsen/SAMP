import { useState } from "react";
import { useNavigate } from "react-router";
import { 
  useQuery, 
  useQueryClient 
} from "@tanstack/react-query";

import { 
  Box,
  Button, 
  TextField, 
  Typography 
} from "@mui/material";

import { optionsQueryListUsers } from "@/features/admin/api/queryListUser";
import { useMutationDeleteUser } from "@/features/admin/api/mutationDeleteUser";
import DataTableColumnsUsers from "@/features/admin/components/DataTableColumnsUsers";
import ModalUserWithDetails from "@/features/admin/components/ModalUserWIthDetails";
import DataTable from "@/components/DataTable";
import HeaderPage from "@/components/HeaderPage";
import ModalConfirmation from "@/components/ModalConfirmation";
import ToastContainer from "@/components/Toast";
import { userFields } from "@/features/admin/utils/getRowUserWIthDetails";

import type { UserDetailDTO } from "@shared/types/user";


export default function ManageUsers() {

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [searchBar, setSearchBar] = useState("");
  const [searchApplied, setSearchApplied] = useState("")
  const [userClicked, setUserClicked] = useState<UserDetailDTO>()
  const [openModalDetails, setOpenModalDetails] = useState(false)
  const [openToast, setOpenToast] = useState("")
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false)

  function executeActionAfterRequest(result: string) {
    setOpenToast(result);
    if (result.includes("success")) {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  }

  const { 
    data: listUsers,
    isError,
    isSuccess, 
    isLoading,
  } = useQuery(
    optionsQueryListUsers(searchApplied)
  )

  const mutationDeleteUser =
    useMutationDeleteUser({
      onSuccess: () => {
        executeActionAfterRequest("success_deleted")
      },
      onError: () => {
        executeActionAfterRequest("error_deleted")
      },
  })

  function handleView(current: UserDetailDTO) {
    setUserClicked(current);
    setOpenModalDetails(true);
  }

  function handleDelete(current: UserDetailDTO) {
    setUserClicked(current);
    setOpenModalConfirmation(true)
  }

  function handleDeactivateEntityRow(action: boolean){
  
    setOpenModalConfirmation(false)
      
    if (!action || !userClicked) return
  
    mutationDeleteUser.mutate(userClicked.id)
  }

  const stateQuery =
    isSuccess ? "SUCCESS" : 
    isLoading ? "LOADING" :
    isError ? "ERROR" : "IDLE";

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
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              onClick={() => navigate('/admin/usuario')}
            >
              Adicionar usuário
            </Button>
          </Typography>
        </HeaderPage>
      </Box>

      <Box component="section" sx={{ py: 2, px: 4}}>
        <TextField
          label="Pesquisa dos usuários"
          placeholder="Pesquisa na listagem dos usuários cadastrados"
          value={searchBar}
          onChange={(e) => setSearchBar(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSearchApplied(searchBar)
              queryClient.invalidateQueries({ queryKey: ['users'] })
            }
          }}
          fullWidth
        />
      </Box>

      <Box component="section" sx={{ py: 2, px: 4}}>
        <DataTable
          state={stateQuery}
          rows={listUsers}
          columns={DataTableColumnsUsers({
            onClickUpdatePasswordItem: (id) => navigate(`/admin/usuario/${id}/alterar-senha`),
            onClickUpdateItem: (id) => navigate(`/admin/usuario/${id}`),
            onClickViewItem: (current) => handleView(current), 
            onClickDeleteItem: (current) => handleDelete(current),
          })}
        />
      </Box>

      <ToastContainer
        open={openToast === "success_deleted"}
        message={"Usuário desativado com sucesso."}
        severity="success"
        onClose={() => setOpenToast("")}
      />

      <ToastContainer
        open={openToast === "error_deleted"}
        message={"Ocorreu um erro ao desativar esse usuário."}
        severity="error"
        onClose={() => setOpenToast("")}
      />

      {userClicked && (
        <ModalUserWithDetails
          open={openModalDetails}
          data={userClicked}
          fields={userFields}
          handleClose={() => setOpenModalDetails(false)}
        />
      )}

      <ModalConfirmation
        open={openModalConfirmation}
        title={"Desativar o usuário atual"}
        description={`Tem certeza que gostaria de desativar o usuário atual? Essa operacão não é inversivel.`}
        handleClose={() => setOpenModalConfirmation(false)}
        handleAnswer={handleDeactivateEntityRow}
      />
    </>
  )
}
