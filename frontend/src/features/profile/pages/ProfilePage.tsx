import { useState } from "react";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

import { 
  Avatar, 
  Box, 
  Button, 
  Divider, 
  Grid, 
  Typography 
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";

import { optionsQueryGetUser } from "@/features/profile/api/queryGetMe";
import { optionsQueryListRoleUserAuthorized } from "@/api/queryListRoleUserAuthorized";
import { useMutationPatchUserProfile } from "@/features/profile/api/mutationUpdateMe";
import { 
  updateProfileSchema, 
  type UpdateProfileSchemaFormData 
} from "@/features/profile/schema/updateProfileSchema";
import { formatAsVisualDate } from "@/features/client/utils/formatAsAVisualDate";

import { ControlledComboBox } from "@/components/ControlledComboBox";
import { ControlledInput } from "@/components/ControlledInputText";
import HeaderPage from "@/components/HeaderPage";
import ToastContainer from "@/components/Toast";


export default function ProfilePage() {

  const [openToast, setOpenToast] = useState("")

  const {
    data: listRoleUserAuthorized,
    isSuccess: isSuccessRoleUserAuthorized,
    isLoading: isLoadingRoleUserAuthorized
  } = useQuery(optionsQueryListRoleUserAuthorized())

  const {
    data: currentUser
  } = useQuery(optionsQueryGetUser())
  
  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<UpdateProfileSchemaFormData>({
    resolver: zodResolver(updateProfileSchema),
    values: currentUser ? { 
      name: currentUser.name, 
      email: currentUser.email,
      roleId: currentUser.roleId 
    } : undefined
  });

  const mutationPatchUserProfile =
    useMutationPatchUserProfile({
      onSuccess: () => {
        setOpenToast("success");
      },
      onError: () => {
        setOpenToast("error");
      },
  })

  const nameuser = useWatch({
    control,
    name: "name",
  });

  const onSubmit: SubmitHandler<UpdateProfileSchemaFormData> = async (data) => {

    const payload = Object.keys(dirtyFields).reduce((acc, key) => {
      acc[key as keyof UpdateProfileSchemaFormData] = data[key as keyof UpdateProfileSchemaFormData]
      return acc
    }, {} as Partial<UpdateProfileSchemaFormData>)

    mutationPatchUserProfile.mutate({
      ...payload,
      id: "user",
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}> 
      <HeaderPage title="Gerenciar perfil"> 
        <Typography variant="h4" component="h1">
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="error"
            sx={{ marginTop: 2 }}
          >
            Alterar senha
          </Button>
        </Typography>
      </HeaderPage>
      <Box 
        component="section" 
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid container spacing={4} sx={{ pt: 8, pb: 3, px: 4 }}>
          <Grid size={{ xs: 12 }}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              sx={{
                width: 56,
                height: 56
              }}
              alt={`${nameuser}: Foto de perfil`}
              src="/static/images/avatar/1.jpg" 
            />
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ pt: 4 }}>
            <ControlledInput
              control={control}
              name="name"
              label="Nome completo"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <ControlledInput
              control={control}
              name="email"
              label="Email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <ControlledComboBox
              control={control}
              name="roleId"
              label='Cargo'
              placeholder='Cargos'
              loading={isLoadingRoleUserAuthorized}
              options={isSuccessRoleUserAuthorized ? listRoleUserAuthorized : []}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              loading={mutationPatchUserProfile.isPending}
              disabled={mutationPatchUserProfile.isPending}
              fullWidth
              sx={{ marginTop: 4 }}
            >
              Atualizar perfil
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box 
        sx={{ 
          mt: 1,
          display: "flex",
          justifyContent: "center",
          gap: 4
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Usuário criado em: {formatAsVisualDate(currentUser?.createdAt)}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Atualizado: {formatAsVisualDate(currentUser?.updatedAt)}
        </Typography>
      </Box>

      <ToastContainer
        open={openToast === "success"}
        message="Perfil atualizado com sucesso."
        severity="success"
        onClose={() => setOpenToast("")}
      />

      <ToastContainer
        open={openToast === "error"}
        message="Ocorreu um erro ao atualizar esse perfil."
        severity="error"
        onClose={() => setOpenToast("")}
      />
    </form>
  )
}