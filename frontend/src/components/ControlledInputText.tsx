import TextField, {
  type TextFieldProps,
} from "@mui/material/TextField";

import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

type ControlledInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
} & TextFieldProps;

export function ControlledInput<T extends FieldValues>({
  control,
  name,
  ...textFieldProps
}: ControlledInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...textFieldProps}
          {...field}
          value={field.value ?? ""}
        />
      )}
    />
  );
}