import TextField, { type TextFieldProps } from "@mui/material/TextField";

import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

type InputMaskTextProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  mask: string;
} & TextFieldProps;

function applyMask(value: string, mask: string) {
  const numbers = value.replace(/\D/g, "");

  let result = "";
  let index = 0;

  for (const char of mask) {
    if (char === "9") {
      if (numbers[index]) {
        result += numbers[index];
        index++;
      } else {
        break;
      }
    } else {
      result += char;
    }
  }

  return result;
}

export function InputMaskText<T extends FieldValues>({
  control,
  name,
  mask,
  ...textFieldProps
}: InputMaskTextProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...textFieldProps}
          {...field}
          value={field.value ?? ""}
          onChange={(event) => {
            const inputValue = event.target.value;

            const previousValue =
              field.value ?? "";

            const isDeleting =
              inputValue.length <
              previousValue.length;

            if (isDeleting) {
              field.onChange(inputValue);

              textFieldProps.onChange?.(event);

              return;
            }

            const maskedValue = applyMask(
              inputValue,
              mask
            );

            event.target.value = maskedValue;

            field.onChange(maskedValue);

            textFieldProps.onChange?.(event);
          }}
        />
      )}
    />
  );
}