import { useState } from "react";
import { FormProvider, useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";

import ApartmentIcon from '@mui/icons-material/Apartment';
import { zodResolver } from "@hookform/resolvers/zod";
import { updateClientSchema, type UpdateSchemaFormData } from "@/features/client/schema/updateClientSchema";

import { ControlledComboBox } from "@/components/ControlledComboBox";
import { ControlledInput } from "@/components/ControlledInputText";
import { ControlledInputMask } from "@/components/ControlledInputMask";
import type { AddressSchemaFormData } from "@/schemas/addressSchema";
import { ModeComponent } from "@/types/mode";

import { ModalAddress } from "@/features/client/components/ModalAddress";
import { CopyButton } from "@/features/client/components/CopyButton";
import { getErrorMessage } from "@/features/client/utils/getErrorMessage";
import { formatAddress } from "@/features/client/utils/formatAddress";
import { emptyClient, mockClient } from "@/features/client/utils/mockConstants";
import { useMutationPostClient, type ClientPostPayload } from "../api/mutationPostClient";
import { useAuth } from "@/auth/AuthProvider";
import { getDocumentMask } from "@/features/client/utils/getDocumentMask";

const optionsType = [
  {
    label: "PF (Pessoa física)",
    value: 1,
  },
  {
    label: "PJ (Pessoa jurídica)",
    value: 2,
  }
]

export default function ManageClientPage() {

  const { getUserId } = useAuth();
  const userId = getUserId()

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const form = useForm<UpdateSchemaFormData>({
    resolver:
      zodResolver(updateClientSchema),

    defaultValues:
      isEditing
        ? mockClient
        : emptyClient,
  });

  const {
    control,
    getValues,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = form

  const [openModalAddressLocation, setOpenModalAddressLocation] = useState(false);
  const [openModalAddressCorrespondence, setOpenModalAddressCorrespondence] = useState(false);

  const documentType = useWatch({
    control,
    name: 'type',
  })
  const protocolMask =
    getDocumentMask(documentType)

  function handlePasteCompleteAddress(target: string, address: AddressSchemaFormData) {
    switch (target) {
      case "locationAddress":
        setValue("locationAddress", address)
        break;
      case "correspondenceAddress":
        setValue("correspondenceAddress", address)
        break;
    }
  }

  function handleOpenLocationModal() {
    setValue("draft.locationAddress", getValues("locationAddress"));
    setOpenModalAddressLocation(true);
  }

  function handleOpenCorrespondenceModal() {
    setValue("draft.correspondenceAddress", getValues("correspondenceAddress"));
    setOpenModalAddressCorrespondence(true);
  }

  const { mutate, isPending } =
    useMutationPostClient({
      onSuccess: () => {
        navigate('/clientes')
      },
  }) 

  const onSubmit: SubmitHandler<UpdateSchemaFormData> = async (data) => {

    const payload: ClientPostPayload = {
      idUser: userId ?? "",
      legalName: data.legalName,
      tradeName: data.tradeName,
      protocol: data.protocol,
      type: data.type,
      dataFundation: new Date(data.fundationDate),
      locationAddress: formatAddress(data.locationAddress),
      correspondenceAddress: formatAddress(data.correspondenceAddress),
      nameContact: data.nameContact,
      numberContact: data.numberContact,
      createdAt: new Date(),
      isActivated: true
    }

    mutate(payload)
  }

  function handleCloseModalManageAddress(whichModal: string) {
    switch (whichModal) {
      case "locationAddress":
        setOpenModalAddressLocation(false);
        break;
      case "correspondenceAddress":
        setOpenModalAddressCorrespondence(false);
        break;
    }
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
                label="Nome Fantasia"
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
                options={optionsType}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ControlledInputMask
                control={control}
                name="protocol"
                mask={protocolMask}
                variant="outlined"
                disabled={!documentType}
                label="Documento"
                fullWidth
                error={!!errors.protocol}
                helperText={errors.protocol?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
              <ControlledInputMask
                control={control}
                name="fundationDate"
                mask="99/99/9999"                  
                variant="outlined"
                label="Data de fundação"
                fullWidth
                error={!!errors.fundationDate}
                helperText={errors.fundationDate?.message}
              />
            </Grid>
          </Grid>

          <Grid container spacing={4} sx={{ py: 2 }}>
            <Grid size={{ xs: 12 }} sx={{ display: 'flex', gap: 1 }}>
              <TextField
                label="Endereço de localização"
                fullWidth
                value={formatAddress(
                  watch("locationAddress")
                )}
                onClick={handleOpenLocationModal}
                error={!!errors.locationAddress}
                helperText={
                  getErrorMessage(
                    errors.locationAddress
                  )
                }
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
              <CopyButton
                value={formatAddress(
                  watch("locationAddress")
                )}
              />
            </Grid>
          </Grid>
          
          <Grid container spacing={4} sx={{ py: 3 }}>
            <Grid size={{ xs: 12 }} sx={{ display: 'flex', gap: 1 }}>
              <TextField
                label="Endereço de correspondencia"
                fullWidth
                value={formatAddress(
                  watch("correspondenceAddress")
                )}
                onClick={handleOpenCorrespondenceModal}
                error={!!errors.correspondenceAddress}
                helperText={
                  getErrorMessage(
                    errors.correspondenceAddress
                  )
                }
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
              <CopyButton
                value={formatAddress(
                  watch("correspondenceAddress")
                )}
              />
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
              <ControlledInput
                control={control}
                name="nameContact"
                label="Nome do contato"
                fullWidth
                error={!!errors.nameContact}
                helperText={errors.nameContact?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <ControlledInputMask
                control={control}
                name="numberContact"
                mask="(99) 99999-9999"                  
                variant="outlined"
                label="Contato"
                fullWidth
                error={!!errors.numberContact}
                helperText={errors.numberContact?.message}
              />
            </Grid>
          </Grid>

          <Grid container spacing={4} >
            <Grid size={{ xs: 12 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                loading={isPending}
                fullWidth
                sx={{ marginTop: 2 }}
              >
                {isEditing ? "Atualizar" : "Cadastrar"}
              </Button>
            </Grid>
          </Grid>
        </Box>
        
        <ModalAddress
          key={"locationAddress"}
          open={openModalAddressLocation}
          mode={isEditing ? ModeComponent.UPDATE : ModeComponent.INSERT}
          target="locationAddress"
          destination="locationAddress"
          handleCloseModal={handleCloseModalManageAddress}
          handlePasteAddress={handlePasteCompleteAddress}
        />

        <ModalAddress
          key={"correspondenceAddress"}
          open={openModalAddressCorrespondence}
          mode={isEditing ? ModeComponent.UPDATE : ModeComponent.INSERT}
          target="correspondenceAddress"
          destination="correspondenceAddress"
          handleCloseModal={handleCloseModalManageAddress}
          handlePasteAddress={handlePasteCompleteAddress}
        />
      </form>
    </FormProvider>
  );
}