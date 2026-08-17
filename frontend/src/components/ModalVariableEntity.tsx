import {
  type Control,
  type FieldErrors,
  type FieldValues,
} from "react-hook-form";

import {
  Box,
  Button,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";

import { ControlledInput } from "@/components/ControlledInputText";
import { ControlledComboBox } from "@/components/ControlledComboBox";
import { ModalContainer } from "@/styles/modalContainer";

import type { FormField } from "@/types/form";
import type { ManageAction } from "@/types/action";


interface ModalVariableEntityProps<T extends FieldValues> {
  open: boolean;
  action: ManageAction;
  title: string;
  fields: FormField<T>[];
  control: Control<T>;
  errors?: FieldErrors<T>;
  isSubmitting: boolean;
  handleSubmitModal: (
    event?: React.BaseSyntheticEvent
  ) => Promise<void>;
  handleClose: () => void;
}

export default function ModalVariableEntity<
  T extends FieldValues
>({
  open,
  title,
  action,
  fields,
  control,
  errors,
  isSubmitting,
  handleSubmitModal,
  handleClose,
}: ModalVariableEntityProps<T>) {

  const renderField = (field: FormField<T>) => {
    const error = errors?.[field.name];

    switch (field.type) {
      case "text":
        return (
          <ControlledInput
            control={control}
            name={field.name}
            label={field.label}
            error={!!error}
            helperText={String(error?.message ?? "")}
            fullWidth
          />
        );

      case "number":
        return (
          <ControlledInput
            type="number"
            control={control}
            name={field.name}
            label={field.label}
            error={!!error}
            helperText={String(error?.message ?? "")}
            fullWidth
          />
        );

      case "textarea":
        return (
          <ControlledInput
            control={control}
            name={field.name}
            label={field.label}
            multiline
            rows={4}
            error={!!error}
            helperText={String(error?.message ?? "")}
            fullWidth
          />
        );

      case "select":
        return (
          <ControlledComboBox
            control={control}
            name={field.name}
            label={field.label}
            options={field.options ?? []}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <ModalContainer>
        <form onSubmit={handleSubmitModal}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              component="h5"
            >
              {title}
            </Typography>

            <Button
              type="button"
              onClick={handleClose}
            >
              <GridCloseIcon />
            </Button>
          </Box>

          <Grid
            container
            spacing={4}
            sx={{
              pt: 3,
              pb: 2,
            }}
          >
            {fields.map((field) => (
              <Grid
                key={field.name}
                size={field.grid ?? { xs: 12 }}
              >
                {renderField(field)}
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              loading={isSubmitting}
              fullWidth
            >
              { action === "ADD" ? ("Inserir") : ("Atualizar") } 
            </Button>
          </Box>
        </form>
      </ModalContainer>
    </Modal>
  );
}