import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";

import {
  Autocomplete,
  TextField,
} from "@mui/material";


type Option<TValue> = {
  label: string;
  value: TValue;
};

type RHFComboBoxProps<
  T extends FieldValues,
  TValue
> = {
  name: Path<T>;
  control: Control<T>;

  label: string;

  options: Option<TValue>[];

  loading?: boolean;
  disabled?: boolean;
  placeholder?: string;
};

export function ControlledComboBox<
  T extends FieldValues,
  TValue
>({
  name,
  control,
  label,
  options,
  loading = false,
  disabled = false,
  placeholder,
}: RHFComboBoxProps<T, TValue>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selectedOption =
          options.find(
            option => option.value === field.value
          ) ?? null;

        return (
          <Autocomplete
            options={options}
            disabled={disabled}
            loading={loading}
            value={selectedOption}
            onChange={(_, option) => {
              field.onChange(option?.value ?? null);
            }}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                inputRef={field.ref}
              />
            )}
          />
        );
      }}
    />
  );
}