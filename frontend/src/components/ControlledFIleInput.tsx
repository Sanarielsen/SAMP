import { Controller } from "react-hook-form";
import { useRef } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";

import {
  OutlinedInput,
  InputAdornment,
  Button,
  FormControl,
  FormHelperText,
} from "@mui/material";

type ControlledFileInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  accept?: string;
  placeholder?: string;
};

export function ControlledFileInput<T extends FieldValues>({
  control,
  name,
  accept,
  placeholder = "Nenhum arquivo selecionado",
}: ControlledFileInputProps<T>) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormControl fullWidth error={!!fieldState.error}>
          <input
            ref={inputRef}
            hidden
            type="file"
            accept={accept}
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              field.onChange(file);
            }}
          />

          <OutlinedInput
            readOnly
            value={field.value?.name ?? ""}
            placeholder={placeholder}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  onClick={() => inputRef.current?.click()}
                >
                  Carregar arquivo
                </Button>
              </InputAdornment>
            }
          />

          <FormHelperText>
            {fieldState.error?.message}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}