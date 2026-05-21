import { useEffect, useState } from "react";
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

import { ModalAddress } from "@/features/client/components/ModalAddress";
import { CopyButton } from "@/features/client/components/CopyButton";
import { getErrorMessage } from "@/features/client/utils/getErrorMessage";
import { formatAddress } from "@/features/client/utils/formatAddress";
import { emptyClient } from "@/features/client/utils/mockConstants";
import { useMutationPostClient, type ClientPostPayload } from "@/features/client/api/mutationPostClient";
import { useMutationPatchClient, type ClientPatchPayload } from "@/features/client/api/mutationPatchClient";
import { useAuth } from "@/auth/AuthProvider";
import { getDocumentMask } from "@/features/client/utils/getDocumentMask";
import { optionsQueryGetClient } from "@/features/client/api/queryGetClient";
import { useQuery } from "@tanstack/react-query";
import { formatDocument } from "../../../utils/formatDocument";
import { formatAsVisualDate } from "../utils/formatAsAVisualDate";
import { parseAddress } from "../utils/formatAddressFromAPI";
import { cleanValue } from "@/utils/cleanValue";
import ToastContainer from "@/components/Toast";

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

  const { 
    data: currentClient, 
  } = useQuery(
    optionsQueryGetClient(String(id))
  )

  const form = useForm<UpdateSchemaFormData>({
    resolver:
      zodResolver(updateClientSchema),

    defaultValues:
      isEditing
        ? currentClient
        : emptyClient,
  });

  const {
    control,
    getValues,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = form

  const [openModalAddressLocation, setOpenModalAddressLocation] = useState(false);
  const [openModalAddressCorrespondence, setOpenModalAddressCorrespondence] = useState(false);
  const [openToast, setOpenToast] = useState("")

  const documentType = useWatch({
    control,
    name: 'type',
  })
  const protocolMask =
    getDocumentMask(documentType)

  useEffect(() => {
    if (currentClient) {
      reset({
        ...currentClient,

        protocol: formatDocument(
          currentClient.protocol
        ),
        fundationDate: formatAsVisualDate(
          currentClient.dataFundation
        ),
        locationAddress: parseAddress(currentClient.locationAddress),
        correspondenceAddress: parseAddress(currentClient.correspondenceAddress)
      })
    }
  }, [currentClient, reset])

  function executeActionAfterRequest(result: string) {
    setOpenToast(result);
    if (result === "success") {
      setTimeout(() => {
        navigate("/clientes");
      }, 5000);
    }
  }

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

  const mutationPostClient =
    useMutationPostClient({
      onSuccess: () => {
        executeActionAfterRequest("success");
      },
      onError: () => {
        executeActionAfterRequest("error");
      },
  })

  const mutationPatchClient = 
    useMutationPatchClient({
      onSuccess: () => {
        executeActionAfterRequest("success");
      },
      onError: () => {
        executeActionAfterRequest("error");
      },
  })

  const onSubmit: SubmitHandler<UpdateSchemaFormData> = async (data) => {

    if ( isEditing ) {
      const payload: ClientPatchPayload = {
        idUser: userId ?? "",
        id: id,
        legalName: data.legalName,
        tradeName: data.tradeName,
        protocol: cleanValue(data.protocol),
        type: data.type,
        dataFundation: new Date(data.fundationDate),
        locationAddress: formatAddress(data.locationAddress),
        correspondenceAddress: formatAddress(data.correspondenceAddress),
        nameContact: data.nameContact,
        numberContact: cleanValue(data.numberContact),
        createdAt: new Date(),
        updatedAt: new Date(),
        isActivated: true
      }

      mutationPatchClient.mutate(payload)
      return
    }

    const payload: ClientPostPayload = {
      idUser: userId ?? "",
      legalName: data.legalName,
      tradeName: data.tradeName,
      protocol: cleanValue(data.protocol),
      type: data.type,
      dataFundation: new Date(data.fundationDate),
      locationAddress: formatAddress(data.locationAddress),
      correspondenceAddress: formatAddress(data.correspondenceAddress),
      nameContact: data.nameContact,
      numberContact: cleanValue(data.numberContact),
      createdAt: new Date(),
      updatedAt: new Date(),
      isActivated: true
    }

    mutationPostClient.mutate(payload)
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
              { isEditing && ( 
                <CopyButton
                  value={formatAddress(
                    watch("locationAddress")
                  )}
                />
              )}
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
              { isEditing && ( 
                <CopyButton
                value={formatAddress(
                  watch("correspondenceAddress")
                )}
              />
              ) }
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
                loading={isEditing ? mutationPatchClient.isPending :  mutationPostClient.isPending}
                fullWidth
                sx={{ marginTop: 2 }}
              >
                {isEditing ? "Atualizar" : "Cadastrar"}
              </Button>
            </Grid>
          </Grid>
        </Box>

        <ToastContainer
          open={openToast === "success"}
          message={ isEditing ? "Cliente atualizado com sucesso." : "Cliente cadastrado com sucesso." }
          severity="success"
          onClose={() => setOpenToast("")}
        />
  
        <ToastContainer
          open={openToast === "error"}
          message={ isEditing ? "Ocorreu um erro ao atualizar esse cliente." : "Ocorreu um erro ao cadastrar esse cliente." }
          severity="error"
          onClose={() => setOpenToast("")}
        />
        
        <ModalAddress
          key={"locationAddress"}
          open={openModalAddressLocation}
          mode={isEditing ? "update" : "insert"}
          target="locationAddress"
          destination="locationAddress"
          handleCloseModal={handleCloseModalManageAddress}
          handlePasteAddress={handlePasteCompleteAddress}
        />

        <ModalAddress
          key={"correspondenceAddress"}
          open={openModalAddressCorrespondence}
          mode={isEditing ? "update" : "insert"}
          target="correspondenceAddress"
          destination="correspondenceAddress"
          handleCloseModal={handleCloseModalManageAddress}
          handlePasteAddress={handlePasteCompleteAddress}
        />
      </form>
    </FormProvider>
  );
}