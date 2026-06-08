import { useParams } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
  Box, 
  Button, 
  Grid 
} from "@mui/material";

import { optionsQueryListRoleUserAuthorized } from "@/api/queryListRoleUserAuthorized";
import { ControlledComboBox } from "@/components/ControlledComboBox";
import { ControlledInput } from "@/components/ControlledInputText";
import HeaderManagePage from "@/components/HeaderManagePage";
import { 
  manageUserSchema, 
  type ManageUserSchemaFormData 
} from "@/schemas/manageUserSchema";


export default function ManageUser() {

  const { id } = useParams();
  const isEditing = !!id;
  const titleHeader = isEditing ? "Atualizando o usuário" : "Cadastro de um novo usuário"

  const {
    data: listRoleUserAuthorized,
    isSuccess: isSuccessRoleUserAuthorized,
    //isLoading: isLoadingRoleUserAuthorized
  } = useQuery(optionsQueryListRoleUserAuthorized())

  const form = useForm<ManageUserSchemaFormData>({
    resolver:
      zodResolver(manageUserSchema),

    // defaultValues:
    //   isEditing
    //     ? currentClient
    //     : emptyClient,
  })

  const onSubmit: SubmitHandler<ManageUserSchemaFormData> = async (data) => {
    console.log("Enviou os dados: ", data)
  }

  return (
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
              // loading={isEditing ?
              //   mutationPatchClient.isPending || mutationPatchClient.isSuccess : 
              //   mutationPostClient.isPending || mutationPostClient.isSuccess
              // }
              // disabled={isEditing ?
              //   mutationPatchClient.isPending || mutationPatchClient.isSuccess : 
              //   mutationPostClient.isPending || mutationPostClient.isSuccess
              // }
              fullWidth
              sx={{ marginTop: 2 }}
            >
              {isEditing ? "Atualizar" : "Cadastrar"}
            </Button>
            </Grid>
        </Grid>
      </Box>
    </form>
  )
}