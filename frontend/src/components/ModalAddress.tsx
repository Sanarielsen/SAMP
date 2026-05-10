import { addressSchema, type AddressSchemaFormData } from "@/schemas/addressSchema";
import { SpanError } from "@/styles/spanError";
import { ModeComponent } from "@/types/mode";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, CircularProgress, Grid, InputAdornment, Modal, TextField, Typography } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import { ControlledInputMask } from "@/components/ControlledInputMask";
import { useCep } from "@/api/getAddressByCEP";
import { ControlledInput } from "./ControlledInputText";

interface ModalAddress {
  open: boolean,
  mode: ModeComponent
  target: string,
  address: AddressSchemaFormData | null,
  handleChangeStatus: (hasOpen: string) => void
  handleSaveValues: (address: AddressSchemaFormData, target: string) => void
}

const emptyAddress: AddressSchemaFormData = {
  cep: "",
  street: "",
  number: "",
  district: "",
  city: "",
  state: "",
  country: "",
  complement: "",
};

export function ModalAddress({ open, mode, target, address, handleChangeStatus, handleSaveValues }: ModalAddress) {

  const {
    control,    
    setError,
    setValue,
    getValues,
    register,
    reset,
    watch,
    formState: { errors }
  } = useForm<AddressSchemaFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: address ?? emptyAddress,
  });

  const labelButtonSubmit = mode === ModeComponent.INSERT ? "Cadastrar endereco" : "Atualizar endereco"

  function handleSaveValuesDependOfField() {    
    handleSaveValues(getValues(), target);
    reset();
    handleChangeStatus(target);
  }

  function handleClose() {
    reset();
    handleChangeStatus(target);
  }

  const addressQuery = useCep(getValues('cep'))
  const cep = watch("cep") ?? "";

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',

            width: '70%',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        > 
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h5"
            >
              {labelButtonSubmit}
            </Typography>
            <Button onClick={() => {handleClose()}}>
              <GridCloseIcon />
            </Button>
          </Box>


          <Grid container spacing={4} sx={{ pt: 3, pb: 2 }}>

            <Grid size={{ xs: 4 }}>
              <ControlledInputMask
                control={control}
                name="cep"
                mask="99999-999"                  
                variant="outlined"
                label="CEP"
                fullWidth
                onChange={ async () => {
                  const cleanedCep = (cep ?? "").replace(/\D/g, "");

                  if (cleanedCep.length !== 8) {
                    return;
                  }

                  const { data, error } = await addressQuery.refetch();

                  if (error || !data) {
                    setError("cep", {
                      type: "manual",
                      message: "CEP inválido.",
                    });

                    return;
                  }

                  setValue("street", data.logradouro);
                  setValue("district", data.bairro);
                  setValue("city", data.localidade);
                  setValue("state", data.uf);
                }}
                error={!!errors.cep}
                helperText={errors.cep?.message}
                slotProps={{
                  input: {
                    endAdornment: addressQuery && addressQuery.isLoading && (
                      <InputAdornment position="end">
                        <CircularProgress size={20} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={4} sx={{ py: 2 }}>

            <Grid size={{ xs: 12, sm: 8, lg: 10 }}>
              <ControlledInput
                control={control}
                name="street"
                label="Lougradouro"
                fullWidth
                error={!!errors.street}
                helperText={errors.street?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4, lg: 2 }}>
              <ControlledInput
                control={control}
                name="number"
                label="Número"
                fullWidth
                error={!!errors.number}
                helperText={errors.number?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <ControlledInput
                control={control}
                name="district"
                label="Bairro"
                fullWidth
                error={!!errors.district}
                helperText={errors.district?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <ControlledInput
                control={control}
                name="city"
                label="Cidade"
                fullWidth
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            </Grid> 

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <ControlledInput
                control={control}
                name="city"
                label="Estado"
                fullWidth
                error={!!errors.state}
                helperText={errors.state?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <ControlledInput
                control={control}
                name="country"
                label="Pais"
                fullWidth
                error={!!errors.country}
                helperText={errors.country?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register("complement")}
                variant="outlined"
                label="Complemento"
                fullWidth
                helperText={
                  errors.complement && <SpanError>{errors.complement.message}</SpanError>
                }
              />
            </Grid>
          </Grid>

          <Grid container spacing={4} sx={{ py: 2 }}> 
            <Button
              sx={{ marginTop: 2 }}
              type="button"
              variant="contained"
              onClick={() => handleSaveValuesDependOfField()}
              fullWidth                
            >
              { labelButtonSubmit }
            </Button>
          </Grid>
        </Box>  
      </Modal>
    </>
  );
}