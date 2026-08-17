import { useState } from "react";
import { 
  useNavigate, 
  useParams 
} from "react-router";
import { 
  useForm, 
  type SubmitHandler
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
  Box, 
  Button, 
  Grid
} from "@mui/material";

import { useMutationUpdateUserPassword } from "@/api/mutationPatchUserPassword";
import { ControlledPasswordInput } from "@/components/ControlledPasswordInput";
import { ControlledInput } from "@/components/ControlledInputText";
import HeaderPage from "@/components/HeaderPage";
import ToastContainer from "@/components/Toast";
import { 
  updatePasswordSchema, 
  type UpdatePasswordSchemaFormData 
} from "@/features/profile/schema/updatePasswordSchema";


export default function UpdatePassword() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [openToast, setOpenToast] = useState<string>();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdatePasswordSchemaFormData>({
    resolver: zodResolver(updatePasswordSchema),
  });

  function executeActionAfterRequest(result: string) {
    setOpenToast(result);
    if (result === "success") {
      setTimeout(() => {
        if (location.pathname.includes("/admin")) {
          navigate("/admin/usuarios/");
        } else {
          navigate("/perfil");
        }
      }, 5000);
    }
  }

  const mutationUpdateUserPassword = 
    useMutationUpdateUserPassword({
      onSuccess: () => {
        executeActionAfterRequest("success");
      },
      onError: () => {
        executeActionAfterRequest("error");
      },
  })

  const onSubmit: SubmitHandler<UpdatePasswordSchemaFormData> = async (data) => {
    mutationUpdateUserPassword.mutate({
      id,
      ...data
    })  
  }

  return (
    <>
      <Box component="section" sx={{ p: 2 }}>
        <HeaderPage title="Alterar senha"/> 

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container 
            spacing={4}
            sx={{ pt: 8, pb: 3, px: 4 }}
          >
            <Grid size={{ xs: 12 }}>
              <ControlledPasswordInput
                control={control}
                name="password"
                label="Nova senha"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <ControlledInput
                type="password"
                control={control}
                name="confirm"
                label="Confirmar senha"
                fullWidth
                error={!!errors.confirm}
                helperText={errors.confirm?.message}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                loading={mutationUpdateUserPassword.isPending ||
                  mutationUpdateUserPassword.isSuccess
                }
                disabled={mutationUpdateUserPassword.isPending ||
                  mutationUpdateUserPassword.isSuccess
                }
                fullWidth
                sx={{ marginTop: 4 }}
              >
                Atualizar perfil
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <ToastContainer
        open={openToast === "success"}
        message="Senha atualizada com sucesso."
        severity="success"
        onClose={() => setOpenToast("")}
      />
      
      <ToastContainer
        open={openToast === "error"}
        message="Ocorreu um erro ao atualizar a senha desse usuário."
        severity="error"
        onClose={() => setOpenToast("")}
      />
    </>
  )
}