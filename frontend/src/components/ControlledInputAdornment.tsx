import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

import {
  InputAdornment,
  TextField,
  type TextFieldProps,
} from "@mui/material";

type ControlledInputAdornmentProps<
  TFieldValues extends FieldValues
> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  contextAdornment: string;
  positionAdornment?: "start" | "end";
} & TextFieldProps;

export function ControlledInputAdornment<
  TFieldValues extends FieldValues
>({
  control,
  name,
  contextAdornment,
  positionAdornment = "start",
  ...textFieldProps
}: ControlledInputAdornmentProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...textFieldProps}
          {...field}
          value={field.value ?? ""}
          slotProps={{
            input: {
              [`${positionAdornment}Adornment`]: (
                <InputAdornment position={positionAdornment}>
                  {contextAdornment}
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  );
}