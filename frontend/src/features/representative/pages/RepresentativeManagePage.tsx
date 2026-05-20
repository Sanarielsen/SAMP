import { useParams } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { Box, Button, Grid, Typography } from "@mui/material";
import { zodResolver } from '@hookform/resolvers/zod';
import HotelClassIcon from '@mui/icons-material/HotelClass';

import {
  manageRepresentativeSchema,
  type ManageRepresentativeSchemaFormData
} from '@/features/representative/schemas/updateRepresentativeSchema';
import { ControlledComboBox } from '@/components/ControlledComboBox';
import { ControlledInputMask } from '@/components/ControlledInputMask';
import { ControlledInput } from '@/components/ControlledInputText';

export default function RepresentativeManagePage() {

  const { id } = useParams();
  const isEditing = !!id;

  // const { 
  //   data: currentRepresentative, 
  // } = useQuery(
  //   optionsQueryGetClient(String(id))
  // )

  const form = useForm<ManageRepresentativeSchemaFormData>({
    resolver:
      zodResolver(manageRepresentativeSchema),

    // defaultValues:
    //   isEditing
    //     ? currentClient
    //     : emptyClient,
  });
  
  const {
    control,
    // getValues,
    handleSubmit,
    // reset,
    // setValue,
    // watch,
    formState: { errors }
    } = form

  const onSubmit: SubmitHandler<ManageRepresentativeSchemaFormData> = async (data) => {
  
    console.log("Cadastra / Atualiza esse representante: ", data)
  }

  return (
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
              name={'idClient'}
              label='Cliente atrelado'
              placeholder='Clientes responsáveis por ti cadastrados'
              options={[{ label: "Teste", value: '1' }]}
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
              //loading={isEditing ? mutationPatchClient.isPending :  mutationPostClient.isPending}
              fullWidth
              sx={{ marginTop: 4 }}
            >
              {isEditing ? "Atualizar" : "Cadastrar"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  )
}