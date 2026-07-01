import { 
  useState, 
  type ReactNode 
} from "react";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";

import {
  Autocomplete,
  TextField,
  Box,
  IconButton,
  Tooltip,
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
  detailIcon?: ReactNode;
  tooltipTitle?: string;
  onDetailClick?: () => void;
  onInputChange?: (inputValue: string) => void;
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
  detailIcon,
  tooltipTitle,
  onDetailClick,
  onInputChange,
}: RHFComboBoxProps<T, TValue>) {
  const [inputValue, setInputValue] = useState("");

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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}>
            <Autocomplete
              options={options}
              disabled={disabled}
              loading={loading}
              value={selectedOption}
              inputValue={inputValue}
              onInputChange={(_, newInputValue, reason) => {
                if (reason === "input" || reason === "clear") {
                  setInputValue(newInputValue);
                  onInputChange?.(newInputValue);
                }
              }}
              onChange={(_, option) => {
                setInputValue(option?.label ?? "");
                field.onChange(option?.value ?? null);
              }}
              isOptionEqualToValue={(option, value) =>
                option.value === (value as Option<TValue>)?.value
              }
              getOptionLabel={(option) => option.label}
              sx={{ flex: 1 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  placeholder={placeholder}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  inputRef={field.ref}
                  fullWidth
                />
              )}
            />

            {detailIcon && (
              <Tooltip title={tooltipTitle}>
                <span>
                  <IconButton
                    size="small"
                    onClick={onDetailClick}
                    aria-label="details"
                    disabled={disabled || !selectedOption}
                  >
                    {detailIcon}
                  </IconButton>
                </span>
              </Tooltip>
            )}
          </Box>
        );
      }}
    />
  );
}
