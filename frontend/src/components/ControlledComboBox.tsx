import {
  useEffect,
  useState,
  type ReactNode,
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
            (option) => option.value === field.value
          ) ?? null;

        useEffect(() => {
          setInputValue(selectedOption?.label ?? "");
        }, [selectedOption]);

        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: "100%",
            }}
          >
            <Autocomplete
              sx={{ flex: 1 }}
              options={options}
              loading={loading}
              disabled={disabled}
              value={selectedOption}
              inputValue={inputValue}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              getOptionLabel={(option) => option.label}
              onInputChange={(_, newInputValue, reason) => {
                if (
                  reason === "input" ||
                  reason === "clear"
                ) {
                  setInputValue(newInputValue);
                  onInputChange?.(newInputValue);
                }
              }}
              onChange={(_, option) => {
                field.onChange(option?.value ?? null);
                setInputValue(option?.label ?? "");
              }}
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
                    aria-label="details"
                    onClick={onDetailClick}
                    disabled={
                      disabled || !selectedOption
                    }
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