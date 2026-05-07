import {
  Autocomplete,
  TextField,
} from "@mui/material";

import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";

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
            (option) =>
              JSON.stringify(option.value) ===
              JSON.stringify(field.value)
          ) ?? null;

        return (
          <Autocomplete<
            Option<TValue>,
            false,
            false,
            false
          >
            options={options}
            disabled={disabled}
            loading={loading}
            value={selectedOption}
            onChange={(_, option) => {
              field.onChange(option?.value ?? null);
            }}
            isOptionEqualToValue={(a, b) =>
              JSON.stringify(a.value) ===
              JSON.stringify(b.value)
            }
            getOptionLabel={(option) =>
              option.label
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                error={!!fieldState.error}
                helperText={
                  fieldState.error?.message
                }
                inputRef={field.ref}
              />
            )}
          />
        );
      }}
    />
  );
}