import { Box, Button, Grid, TextField, Typography } from "@mui/material";

import ApartmentIcon from '@mui/icons-material/Apartment';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateClientSchema, type UpdateSchemaFormData } from "@/features/client/schema/updateClientSchema";
import { SpanError } from "@/styles/spanError";
import { ControlledComboBox } from "@/components/ControlledComboBox";
import { ModalAddress } from "@/components/ModalAddress";
import { useState } from "react";
import { ModeComponent } from "@/types/mode";
import { ControlledInput } from "@/components/ControlledInputText";
import type { AddressSchemaFormData } from "@/schemas/addressSchema";
import { ControlledInputCalendar } from "@/components/ControlledInputCalendar";


const optionsTypePeople = [
  {
    label: "PF (Pessoa física)",
    value: 1,
  },
  {
    label: "PJ (Pessoa jurídica)",
    value: 2,
  }
]

export default function UpdateClientPage() {

  const {
    control,
    clearErrors,
    getValues,
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateSchemaFormData>({
    resolver: zodResolver(updateClientSchema),
  });

  const [openModal, setOpenModal] = useState(false);
  const [modeModal, setModeModal] = useState<ModeComponent>(ModeComponent.INSERT);
  const [targetModal, setTargetModal] = useState("");

  const [addressCurrent, setAddressCurrent] = useState<AddressSchemaFormData | null>(null);
  const [addressLocalization, setAddressLocalization] = useState<AddressSchemaFormData | null>(null);
  const [addressCorrespondence, setAddressCorrespondence] = useState<AddressSchemaFormData | null>(null);

  const hasLocationAddress = !!getValues("locationAddress");
  const hasCorrespondenceAddress = !!getValues("correspondenceAddress");

  function handleManageCurrentAddress(hasNewAddress: boolean, target: string) {
    setModeModal(!hasNewAddress ? ModeComponent.INSERT : ModeComponent.UPDATE)
    setTargetModal(target)
    setAddressCurrent(null)

    if (target === "locationAddress" && hasLocationAddress) {      
      setAddressCurrent(addressLocalization)
      clearErrors("locationAddress");
    } else if (target === "correspondenceAddress" && hasCorrespondenceAddress) {
      setAddressCurrent(addressCorrespondence)
      clearErrors("correspondenceAddress");
    }
    setOpenModal(true)
  }

  const onSubmit: SubmitHandler<UpdateSchemaFormData> = async (data) => {
    console.log(data);
  }

  function resetFollowingField(target: string) {
    setOpenModal(false)
    if (target === "locationAddress") {      
      clearErrors("locationAddress");
    } else if (target === "correspondenceAddress") {
      clearErrors("correspondenceAddress");
    }
  }

  function handleSaveAddressCorrectly(data: AddressSchemaFormData, field: string) {
    const address = [
      data.street,
      data.number,
      data.district,
      data.city,
      data.state,
      data.country,
      data.cep,
      data.complement
    ].filter(Boolean)

    if (field === "locationAddress") {
      setAddressLocalization(data);
      setValue("locationAddress", Object.values(address).join(", "))
    } else if (field === "correspondenceAddress") {
      setAddressCorrespondence(data);
      setValue("correspondenceAddress", Object.values(address).join(", "))
    }    
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
              Adicionar novo cliente
            </Typography>
          </Grid>

          <Grid 
            size={{ xs: 12}}
            sx={{
              textAlign:"center"
            }}
          >
            <ApartmentIcon fontSize="large" />
          </Grid>    
        </Grid>

        <Grid container spacing={4} sx={{ pt: 8, pb: 3 }}>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <ControlledInput
              control={control}
              name="legalName"
              label="Razão social"
              fullWidth
              error={!!errors.legalName}
              helperText={errors.legalName?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <ControlledInput
              control={control}
              name="tradeName"
              label="Nome fantasia"
              fullWidth
              error={!!errors.tradeName}
              helperText={errors.tradeName?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <ControlledComboBox
              name="type"
              control={control}
              label="Tipo de cliente"
              placeholder="Select a company"
              options={optionsTypePeople}
            />

          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <ControlledInput
              control={control}
              name="protocol"
              label="Número do documento (RG / CNPJ)"
              fullWidth
              error={!!errors.protocol}
              helperText={errors.protocol?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
            <ControlledInputCalendar
              control={control}
              name="fundationDate"
              label="Data de Fundação"
            />
            <TextField
              {...register("fundationDate")}
              variant="outlined"
              id="itFundationDate"
              label="Data de Fundacão"
              fullWidth
              helperText={
                errors.fundationDate && <SpanError>{errors.fundationDate.message}</SpanError>
              }
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ py: 2 }}>
          <Grid size={{ xs: 11, sm: 11 }}>
            <ControlledInput
              control={control}
              name="locationAddress"
              label="Endereco de localizacão"
              fullWidth
              onClick={() => handleManageCurrentAddress(hasLocationAddress, "locationAddress")}
              error={!!errors.locationAddress}
              helperText={errors.locationAddress?.message}
            />
          </Grid>
          <Grid size={{ xs: 1, sm: 1 }} sx={{ display: 'flex', alignItems: 'center' }}>
            <ContentCopyIcon fontSize="large" />
          </Grid>
        </Grid>
        
        <Grid container spacing={4} sx={{ py: 3 }}>
          <Grid size={{ xs: 11, sm: 11 }}>
            <ControlledInput
              control={control}
              name="correspondenceAddress"
              label="Endereco de correspondencia"
              fullWidth
              onClick={() => handleManageCurrentAddress(hasCorrespondenceAddress, "correspondenceAddress")}
              error={!!errors.correspondenceAddress}
              helperText={errors.correspondenceAddress?.message}
            />       
          </Grid>
          <Grid size={{ xs: 1, sm: 1 }} sx={{ display: 'flex', alignItems: 'center' }}>
            <ContentCopyIcon fontSize="large" />
          </Grid>
        </Grid>
        
        <Grid container spacing={4} sx={{ py: 2 }}>
          <Grid size={{ xs: 12, lg: 4 }} 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography variant="h5" component="h5">
              Informacões de contato:
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextField
              {...register("nameContact")}
              variant="outlined"
              label="Nome"
              fullWidth
              helperText={
                errors.nameContact && <SpanError>{errors.nameContact.message}</SpanError>
              }
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextField
              {...register("numberContact")}
              variant="outlined"
              label="Contato"
              fullWidth
              helperText={
                errors.numberContact && <SpanError>{errors.numberContact.message}</SpanError>
              }
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} >
          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Entrar
            </Button>
          </Grid>
        </Grid>
      </Box>
      
      <ModalAddress 
        key={JSON.stringify(addressCurrent)}
        open={openModal}
        mode={modeModal}
        target={targetModal}
        address={addressCurrent}
        handleChangeStatus={(target) => resetFollowingField(target)}
        handleSaveValues={(values, target) => handleSaveAddressCorrectly(values, target)}
      />
    </form>
  );
}