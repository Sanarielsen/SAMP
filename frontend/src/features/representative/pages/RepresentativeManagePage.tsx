import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';

import { Box, Button, Grid, Typography } from "@mui/material";
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import HotelClassIcon from '@mui/icons-material/HotelClass';

import { optionsGetRepresentative } from '@/features/representative/api/getRepresentative';
import { optionsQueryListClientsWithOptions } from '@/api/listClientsWithOptions';
import { useMutationPostRepresentative } from '@/features/representative/api/mutationPostRepresentative';
import { useMutationPatchRepresentative } from '@/features/representative/api/mutationPatchRepresentative';
import { ControlledComboBox } from '@/components/ControlledComboBox';
import { ControlledInputMask } from '@/components/ControlledInputMask';
import { ControlledInput } from '@/components/ControlledInputText';
import ToastContainer from '@/components/Toast';
import {
  manageRepresentativeSchema,
  type ManageRepresentativeSchemaFormData
} from '@/features/representative/schemas/updateRepresentativeSchema';

import { emptyRepresentative } from '@/features/representative/utils/mockRepresentative';
import { cleanValue } from '@/utils/cleanValue';

import type { CreateRepresentativeDTO, UpdateRepresentativeDTO } from '@shared/types/representative';
import { formatDocument } from '@/utils/formatDocument';


export default function RepresentativeManagePage() {

  const [openToast, setOpenToast] = useState("")

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const { 
    data: currentRepresentative,
  } = useQuery(
    optionsGetRepresentative(String(id), isEditing),
  )

  const { 
    data: listClientsWithOptions,
    isSuccess: isSuccesslistClientsWithOptions
  } = useQuery(
    optionsQueryListClientsWithOptions()
  )

  const form = useForm<ManageRepresentativeSchemaFormData>({
    resolver:
      zodResolver(manageRepresentativeSchema),

    defaultValues:
      isEditing
        ? currentRepresentative
        : emptyRepresentative,
  });
  
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
    } = form

  useEffect(() => {
    if (currentRepresentative) {
      reset({
        ...currentRepresentative,
        documentRG: formatDocument(currentRepresentative.documentRG),
        documentCPF: formatDocument(currentRepresentative.documentCPF)
      })
    }
  }, [currentRepresentative, reset])

  function executeActionAfterRequest(result: string) {
    setOpenToast(result);
    if (result === "success") {
      setTimeout(() => {
        navigate("/representantes");
      }, 5000);
    }
  }

  const mutationPostRepresentative =
    useMutationPostRepresentative({
      onSuccess: () => {
        executeActionAfterRequest("success")
      },
      onError: () => {
        executeActionAfterRequest("error")
      },
  })

  const mutationPatchRepresentative =
    useMutationPatchRepresentative({
      onSuccess: () => {
        executeActionAfterRequest("success")
      },
      onError: () => {
        executeActionAfterRequest("error")
      },
  })

  const onSubmit: SubmitHandler<ManageRepresentativeSchemaFormData> = async (data) => {

    if ( isEditing ) {
      const payload: UpdateRepresentativeDTO = {
        id,
        clientId: data.clientId,
        name: data.name,
        nationality: data.nationality,
        documentRG: cleanValue(data.documentRG),
        documentCPF: cleanValue(data.documentCPF),
        titleJob: data.titleJob,
        roleJob: data.roleJob
      }

      mutationPatchRepresentative.mutate(payload)
      return
    }
  
    const payload: CreateRepresentativeDTO = {
      clientId: data.clientId,
      name: data.name,
      nationality: data.nationality,
      documentRG: cleanValue(data.documentRG),
      documentCPF: cleanValue(data.documentCPF),
      titleJob: data.titleJob,
      roleJob: data.roleJob
    }

    mutationPostRepresentative.mutate(payload)  
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box component="section" sx={{ p: 8 }}>
          <Grid
            container 
            spacing={4} 
            sx={{
              textAlign: { xs: "center", md: "left" }
            }}
          >
            <Grid 
              size={{ xs: 12}}
              sx={{
                textAlign:"center"
              }}
            >
              <Typography variant="h4" component="h1">
                Adicionar novo representante
              </Typography>
            </Grid>

            <Grid 
              size={{ xs: 12}}
              sx={{
                textAlign:"center"
              }}
            >
              <HotelClassIcon fontSize="large" />
            </Grid>    
          </Grid>

          <Grid container spacing={4} sx={{ pt: 8, pb: 3 }}>
            <Grid size={{ xs: 12 }}>
              <ControlledComboBox
                control={control}
                name={'clientId'}
                label='Cliente atrelado'
                placeholder='Clientes responsáveis por ti cadastrados'
                options={isSuccesslistClientsWithOptions ? listClientsWithOptions : []}
              />
            </Grid>
          </Grid>

          <Grid container spacing={4} sx={{ pt: 8, pb: 3 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ControlledInput
                control={control}
                name="name"
                label="Nome completo"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ControlledInput
                control={control}
                name="nationality"
                label="Nacionalidade"
                fullWidth
                error={!!errors.nationality}
                helperText={errors.nationality?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ControlledInputMask
                control={control}
                name="documentRG"
                mask={'99.999.999.9'}
                variant="outlined"
                label="RG"
                fullWidth
                error={!!errors.documentRG}
                helperText={errors.documentRG?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ControlledInputMask
                control={control}
                name="documentCPF"
                mask={'999.999.999-99'}
                variant="outlined"
                label="CPF"
                fullWidth
                error={!!errors.documentCPF}
                helperText={errors.documentCPF?.message}
              />
            </Grid>
          
          
            <Grid size={{ xs: 12, sm: 6 }}>
              <ControlledInput
                control={control}
                name="titleJob"
                label="Profissão"
                fullWidth
                error={!!errors.titleJob}
                helperText={errors.titleJob?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ControlledInput
                control={control}
                name="roleJob"
                label="Cargo"
                fullWidth
                error={!!errors.roleJob}
                helperText={errors.roleJob?.message}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid size={{ xs: 12 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                loading={isEditing ? 
                  mutationPatchRepresentative.isPending :
                  mutationPostRepresentative.isPending
                }
                disabled={isEditing ? 
                  mutationPatchRepresentative.isPending :
                  mutationPostRepresentative.isPending
                }  
                fullWidth
                sx={{ marginTop: 4 }}
              >
                {isEditing ? "Atualizar" : "Cadastrar"}
              </Button>
            </Grid>
          </Grid>
        </Box>

        <ToastContainer
          open={openToast === "success"}
          message={ isEditing ? "Representante atualizado com sucesso." : "Representante cadastrado com sucesso." }
          severity="success"
          onClose={() => setOpenToast("")}
        />

        <ToastContainer
          open={openToast === "error"}
          message={ isEditing ? "Ocorreu um erro ao atualizar esse representante." : "Ocorreu um erro ao cadastrar esse representante." }
          severity="error"
          onClose={() => setOpenToast("")}
        />
      </form>
    </FormProvider>
  )
}