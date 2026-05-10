import { useState } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";

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

const emptyAddress = {
  cep: "",
  street: "",
  number: "",
  district: "",
  city: "",
  state: "",
  country: "",
  complement: "",
};

export default function UpdateClientPage() {

  const form = useForm<UpdateSchemaFormData>({
    resolver: zodResolver(updateClientSchema),
    defaultValues: {
      legalName: "",
      tradeName: "",
      nameContact: "",
      numberContact: "",
      fundationDate: "",
      protocol: "",
      type: "",

      locationAddress: emptyAddress,

      correspondenceAddress: emptyAddress,

      draft: {
        locationAddress: emptyAddress,
        correspondenceAddress: emptyAddress,
      },
    },
    });

  const {
    control,
    clearErrors,
    getValues,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = form

  const [openModalAddressLocation, setOpenModalAddressLocation] = useState(false);
  const [openModalAddressCorrespondence, setOpenModalAddressCorrespondence] = useState(false);
  const [modeModal, setModeModal] = useState<ModeComponent>(ModeComponent.INSERT);
  const [targetModal, setTargetModal] = useState("");

  const [localAddress, setLocalAddress] = useState<AddressSchemaFormData | null>(null);
  const [addressLocalization, setAddressLocalization] = useState<AddressSchemaFormData | null>(null);
  const [addressCorrespondence, setAddressCorrespondence] = useState<AddressSchemaFormData | null>(null);

  const hasLocationAddress = !!getValues("locationAddress");
  const hasCorrespondenceAddress = !!getValues("correspondenceAddress");

    // function handleOpenLocationModal() {
  
    //   const current =
    //     getValues("locationAddress");
  
    //   setLocalAddress(
    //     current || emptyAddress
    //   );
  
    //   setOpenModalAddressLocation(true);
    // }
  
    // function handleOpenCorrespondenceModal() {
  
    //   const current =
    //     getValues("correspondenceAddress");
  
    //   setLocalAddress(
    //     current || emptyAddress
    //   );
  
    //   setOpenModalAddressCorrespondence(true);
    // }

  // function handleManageCurrentAddress(hasNewAddress: boolean, target: string) {
  //   setModeModal(!hasNewAddress ? ModeComponent.INSERT : ModeComponent.UPDATE)
  //   setTargetModal(target)
  //   setAddressCurrent(null)

  //   if (target === "locationAddress" && hasLocationAddress) {      
  //     setAddressCurrent(addressLocalization)
  //     clearErrors("locationAddress");
  //   } else if (target === "correspondenceAddress" && hasCorrespondenceAddress) {
  //     setAddressCurrent(addressCorrespondence)
  //     clearErrors("correspondenceAddress");
  //   }
  //   //setOpenModal(true)
  // }

  const locationAddressVisual = watch("locationAddress");

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

  setValue(
    "draft.locationAddress",

    getValues("locationAddress")
  );

  setOpenModalAddressLocation(true);
}

function handleOpenCorrespondenceModal() {

  setValue(
    "draft.correspondenceAddress",

    getValues(
      "correspondenceAddress"
    )
  );

  setOpenModalAddressCorrespondence(
    true
  );
}

  const onSubmit: SubmitHandler<UpdateSchemaFormData> = async (data) => {
    console.log(data);
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

  function resetFollowingField(target: string) {
    //setOpenModal(false)
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
      // setValue("locationAddress", Object.values(address).join(", "))
    } else if (field === "correspondenceAddress") {
      setAddressCorrespondence(data);
      // setValue("correspondenceAddress", Object.values(address).join(", "))
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
              <ControlledInput
                control={control}
                name="protocol"
                label="Protocolo"
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
              <ControlledInput
                control={control}
                name="numberContact"
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
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Entrar
              </Button>
            </Grid>
          </Grid>
        </Box>
        
        <ModalAddress
          key={"locationAddress"}
          open={openModalAddressLocation}
          mode={ModeComponent.INSERT}
          target="locationAddress"
          destination="locationAddress"
          handleCloseModal={handleCloseModalManageAddress}
          handlePasteAddress={handlePasteCompleteAddress}
        />

        <ModalAddress
          key={"correspondenceAddress"}
          open={openModalAddressCorrespondence}
          mode={ModeComponent.INSERT}
          target="correspondenceAddress"
          destination="correspondenceAddress"
          handleCloseModal={handleCloseModalManageAddress}
          handlePasteAddress={handlePasteCompleteAddress}
        />
      </form>
    </FormProvider>
  );
}