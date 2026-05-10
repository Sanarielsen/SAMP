import dayjs from "dayjs";

import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

import {
  DatePicker,
} from "@mui/x-date-pickers/DatePicker";


export function ControlledInputCalendar<T extends FieldValues>({
  control,
  name,
  label,
}: {
  control: Control<T>;
  name: Path<T>;
  label?: string;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <DatePicker
          label={label}
          value={
            field.value && dayjs(field.value).isValid()
              ? dayjs(field.value)
              : null
          }
          onChange={(date) => {
            field.onChange(date ? date.toISOString() : "");
          }}
          slotProps={{
            textField: {
              fullWidth: true,
            },
          }}
        />
      )}
    />
  );
}