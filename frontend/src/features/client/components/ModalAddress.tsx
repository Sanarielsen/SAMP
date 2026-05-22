import {
  useFormContext,
  type FieldErrors,
} from "react-hook-form";

import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Modal,
  Typography,
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";

import { useCep } from "@/api/getAddressByCEP";
import { ControlledInput } from "@/components/ControlledInputText";
import { ControlledInputMask } from "@/components/ControlledInputMask";
import { ModalContainer } from "@/features/client/styles/modalAddressContainer";
import { mappingAddressToVisualComponent } from "@/features/client/utils/mappingAddressToVisualComponent";
import type { AddressSchemaFormData } from "@/schemas/addressSchema";
import type { UpdateSchemaFormData } from "@/features/client/schema/updateClientSchema";
import type { ModeComponent } from "@/types/mode";

interface ModalAddressProps {
  open: boolean;
  mode: ModeComponent;
  target: | "locationAddress"
    | "correspondenceAddress";
  destination:
    | "locationAddress"
    | "correspondenceAddress";
  handleCloseModal: (
    whichModal: | "locationAddress"
    | "correspondenceAddress"
  ) => void;
  handlePasteAddress: (
    target: string, 
    address: AddressSchemaFormData
  ) => void;
}

export function ModalAddress({
  open,
  mode,
  target,
  destination,
  handleCloseModal,
  handlePasteAddress,
}: ModalAddressProps) {

  const {
    control,
    getValues,
    setError,
    setValue,
    resetField,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<UpdateSchemaFormData>();

  const labelButtonSubmit =
    mode === "insert"
      ? "Cadastrar endereço"
      : "Atualizar endereço";

  const fieldError =
    errors?.draft?.[
      destination
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as FieldErrors<any>;

  const cep =
    watch(`draft.${destination}.cep`) ?? "";

  const addressQuery = useCep(cep);

  async function handleSaveAddress() {

    const valid = await trigger([
      `draft.${destination}.cep`,
      `draft.${destination}.street`,
      `draft.${destination}.number`,
      `draft.${destination}.district`,
      `draft.${destination}.city`,
      `draft.${destination}.state`,
      `draft.${destination}.country`,
    ]);

    const draftAddress = getValues(`draft.${destination}`)

    if (!valid || !draftAddress) return
    
    const newObject: AddressSchemaFormData = mappingAddressToVisualComponent(draftAddress)
    handlePasteAddress(target, newObject);
    resetField(`draft.${destination}`);
    handleCloseModal(target);
  }

  function handleClose() {

    resetField(`draft.${destination}`);
    handleCloseModal(target);
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h5"
          >
            {labelButtonSubmit}
          </Typography>

          <Button onClick={handleClose}>
            <GridCloseIcon />
          </Button>
        </Box>

        <Grid
          container
          spacing={4}
          sx={{ pt: 3, pb: 2 }}
        >
          <Grid size={{ xs: 6, sm: 4 }}>
            <ControlledInputMask
              control={control}
              name={`draft.${destination}.cep`}
              mask="99999-999"
              variant="outlined"
              label="CEP"
              fullWidth
              onChange={async () => {

                const cleanedCep =
                  (cep ?? "").replace(/\D/g, "");

                if (cleanedCep.length !== 8) {
                  return;
                }

                const {
                  data,
                  error,
                } = await addressQuery.refetch();

                if (error || !data) {
                  setError(
                    `${destination}.cep`,
                    {
                      type: "manual",
                      message: "CEP inválido.",
                    }
                  );

                  return;
                }

                setValue(
                  `draft.${destination}.street`,
                  data.logradouro
                );
                setValue(
                  `draft.${destination}.district`,
                  data.bairro
                );
                setValue(
                  `draft.${destination}.city`,
                  data.localidade
                );
                setValue(
                  `draft.${destination}.state`,
                  data.uf
                );
              }}
              error={!!fieldError?.cep}
              helperText={
                String(fieldError?.cep?.message ?? "")
              }
              slotProps={{
                input: {
                  endAdornment:
                    addressQuery.isLoading && (
                      <InputAdornment position="end">
                        <CircularProgress size={20} />
                      </InputAdornment>
                    ),
                },
              }}
            />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={4}
          sx={{ py: 2 }}
        >
          <Grid size={{ xs: 12, sm: 8, lg: 10 }}>
            <ControlledInput
              control={control}
              name={`draft.${destination}.street`}
              label="Logradouro"
              fullWidth
              error={!!fieldError?.street}
              helperText={
                String(fieldError?.street?.message ?? "")
              }
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4, lg: 2 }}>
            <ControlledInput
              control={control}
              name={`draft.${destination}.number`}
              label="Número"
              fullWidth
              error={!!fieldError?.number}
              helperText={
                String(fieldError?.number?.message ?? "")
              }
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <ControlledInput
              control={control}
              name={`draft.${destination}.district`}
              label="Bairro"
              fullWidth
              error={!!fieldError?.district}
              helperText={
                String(fieldError?.district?.message ?? "")
              }
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <ControlledInput
              control={control}
              name={`draft.${destination}.city`}
              label="Cidade"
              fullWidth
              error={!!fieldError?.city}
              helperText={
                String(fieldError?.city?.message ?? "")
              }
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <ControlledInput
              control={control}
              name={`draft.${destination}.state`}
              label="Estado"
              fullWidth
              error={!!fieldError?.state}
              helperText={
                String(fieldError?.state?.message ?? "")
              }
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <ControlledInput
              control={control}
              name={`draft.${destination}.country`}
              label="País"
              fullWidth
              error={!!fieldError?.country}
              helperText={
                String(fieldError?.country?.message ?? "")
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
          <ControlledInput
            control={control}
            name={`draft.${destination}.complement`}
            label="Complemento"
            fullWidth
            error={!!fieldError?.complement}
            helperText={
              String(
                fieldError?.complement?.message ?? ""
              )
            }
          />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={4}
          sx={{ py: 2 }}
        >
          <Button
            sx={{ marginTop: 2 }}
            type="button"
            variant="contained"
            onClick={handleSaveAddress}
            fullWidth
          >
            {labelButtonSubmit}
          </Button>
        </Grid>
      </ModalContainer>
    </Modal>
  );
}