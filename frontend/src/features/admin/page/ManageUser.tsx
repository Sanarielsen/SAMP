import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
  Box, 
  Button, 
  Grid 
} from "@mui/material";

import { optionsQueryGetUser } from "@/features/admin/api/queryGetUser";
import { optionsQueryListRoleUserAuthorized } from "@/api/queryListRoleUserAuthorized";
import { useMutationPatchUser } from "@/features/admin/api/mutationPatchUser";
import { useMutationPostUserWithoutPassword } from "@/features/admin/api/mutationPostUserWithoutPassword";
import { ControlledComboBox } from "@/components/ControlledComboBox";
import { ControlledInput } from "@/components/ControlledInputText";
import HeaderManagePage from "@/components/HeaderManagePage";
import ToastContainer from "@/components/Toast";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { 
  manageUserSchema, 
  type ManageUserSchemaFormData 
} from "@/schemas/manageUserSchema";
import { emptyUser } from "@/features/admin/utils/getEmptyUser";


export default function ManageUser() {

  const actionAudio = useAudioFeedback();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const titleHeader = isEditing ? "Atualizando o usuário" : "Cadastro de um novo usuário"
  
  const [openToast, setOpenToast] = useState("")

  function executeActionAfterRequest(result: string) {
    setOpenToast(result);
    if (result.includes("success")) {
      setTimeout(() => {
        navigate(`/admin/usuarios`);
      }, 5000);
    }
  }

  const {
    data: listRoleUserAuthorized,
    isSuccess: isSuccessRoleUserAuthorized,
  } = useQuery(optionsQueryListRoleUserAuthorized())

  const {
    data: getUser
  } = useQuery(optionsQueryGetUser(id))

  const mutationPostUser =
    useMutationPostUserWithoutPassword({
      onSuccess: () => {
        actionAudio.playSuccess();
        executeActionAfterRequest("success_created")
      },
      onError: () => {
        actionAudio.playError();
        executeActionAfterRequest("error_created")
      },
  })

  const mutationPatchUser =
    useMutationPatchUser({
      onSuccess: () => {
        actionAudio.playSuccess();
        executeActionAfterRequest("success_updated")
      },
      onError: () => {
        actionAudio.playError();
        executeActionAfterRequest("error_updated")
      },
  })

  const form = useForm<ManageUserSchemaFormData>({
    resolver:
      zodResolver(manageUserSchema),

    defaultValues:
      isEditing
        ? getUser
        : emptyUser,
  })

  useEffect(() => {
    if (getUser) {
      form.reset({
        ...getUser
      })
    }
    }, [getUser, form.reset])

  const onSubmit: SubmitHandler<ManageUserSchemaFormData> = async (data) => {

    if (isEditing) {
      mutationPatchUser.mutate({
        ...data,
        id
      })
      return;
    }
    mutationPostUser.mutate(data)
  }

  const hasExecutionRunning = 
    mutationPostUser.isPending ||
    mutationPostUser.isSuccess ||
    mutationPatchUser.isPending ||
    mutationPatchUser.isSuccess

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <HeaderManagePage 
          title={titleHeader}
          action={isEditing ? "UPDATE" : "ADD"}
        />

        <Box component="section" sx={{ px: 8 }}>
          <Grid container spacing={4} sx={{ pt: 8, pb: 3 }}>

            <Grid size={{ xs: 12, md: 5 }}>
              <ControlledInput
                control={form.control}
                label="Nome"
                name="name"
                fullWidth
                error={
                  !!form.formState.errors?.name}
                helperText={
                  String(form.formState.errors?.name?.message 
                    ?? "")
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 7 }}>
              <ControlledInput
                control={form.control}
                label="Email"
                name="email"
                fullWidth
                error={
                  !!form.formState.errors?.email}
                helperText={
                  String(form.formState.errors?.email?.message 
                    ?? "")
                }
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <ControlledComboBox
                control={form.control}
                name={'roleId'}
                label='Cargo'
                placeholder='Cargo do usuário'
                options={isSuccessRoleUserAuthorized ? listRoleUserAuthorized : []}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                loading={hasExecutionRunning}
                disabled={hasExecutionRunning}
                fullWidth
                sx={{ marginTop: 2 }}
              >
                {isEditing ? "Atualizar" : "Cadastrar"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>

      <ToastContainer
        open={openToast === "success_created"}
        message={"Usuário criado com sucesso. Ative o seu registro atribuindo uma senha na lista de usuários."}
        severity="success"
        onClose={() => setOpenToast("")}
      />

      <ToastContainer
        open={openToast === "error_created"}
        message={"Ocorreu um erro ao criar esse usuário."}
        severity="error"
        onClose={() => setOpenToast("")}
      />


      <ToastContainer
        open={openToast === "success_updated"}
        message={"Usuário atualizado com sucesso. Ative o seu registro atribuindo uma senha na lista de usuários."}
        severity="success"
        onClose={() => setOpenToast("")}
      />

      <ToastContainer
        open={openToast === "error_updated"}
        message={"Ocorreu um erro ao atualizar esse usuário."}
        severity="error"
        onClose={() => setOpenToast("")}
      />

    </>
  )
}