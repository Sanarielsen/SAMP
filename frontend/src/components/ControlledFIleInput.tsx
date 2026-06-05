import { Controller } from "react-hook-form";
import { useRef } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";

type ControlledFileInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
};

export function ControlledFileInput<T extends FieldValues>({
  control,
  name,
}: ControlledFileInputProps<T>) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message;

        return (
          <div>
            {/* hidden input */}
            <input
              ref={inputRef}
              type="file"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                field.onChange(file);
              }}
            />

            {/* trigger button */}
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
            >
              Selecionar arquivo
            </button>

            {/* preview */}
            {field.value?.name && (
              <p>Arquivo: {field.value.name}</p>
            )}

            {/* error */}
            {error && (
              <p style={{ color: "red" }}>
                {error}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}