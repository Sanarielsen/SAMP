import { useRef } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import TextField, { type TextFieldProps } from "@mui/material/TextField";

type ControlledInputMaskProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  mask: string; 
} & Omit<TextFieldProps, "name">;


export function ControlledInputMask<T extends FieldValues>({
  control,
  name,
  mask,
  ...textFieldProps
}: ControlledInputMaskProps<T>) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const getInitialMask = () => mask.replace(/9/g, " ");

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const currentValue = field.value || getInitialMask();

        return (
          <TextField
            {...textFieldProps}
            {...field}
            inputRef={(e) => {
              field.ref(e);
              inputRef.current = e;
            }}
            value={currentValue}
            onChange={(event) => {
              const inputEl = event.target;
              const newRawValue = inputEl.value;
              const cursorStart = inputEl.selectionStart || 0;

              let newValueArr = currentValue.split("");
              
              if (newRawValue.length < currentValue.length) {
                
                const deletedIndex = cursorStart;

                if (mask[deletedIndex] === "9") {
                  newValueArr[deletedIndex] = " ";
                } else {
                  
                  let prevIndex = deletedIndex - 1;
                  while (prevIndex >= 0 && mask[prevIndex] !== "9") {
                    prevIndex--;
                  }
                  if (prevIndex >= 0) {
                    newValueArr[prevIndex] = " ";
                  }
                }

                const updatedValue = newValueArr.join("");
                field.onChange(updatedValue);
                textFieldProps.onChange?.(event);

                requestAnimationFrame(() => {
                  if (inputRef.current) {
                    const targetPos = mask[deletedIndex] !== "9" ? deletedIndex : cursorStart;
                    inputRef.current.setSelectionRange(targetPos, targetPos);
                  }
                });
              } else {
                const insertedChar = newRawValue[cursorStart - 1];

                if (/\d/.test(insertedChar)) {
                  let writeIndex = cursorStart - 1;

                  while (writeIndex < mask.length && mask[writeIndex] !== "9") {
                    writeIndex++;
                  }

                  if (writeIndex < mask.length && mask[writeIndex] === "9") {
                    newValueArr[writeIndex] = insertedChar;
                    const nextCursor = writeIndex + 1;

                    const updatedValue = newValueArr.join("");
                    field.onChange(updatedValue);
                    textFieldProps.onChange?.(event);

                    requestAnimationFrame(() => {
                      if (inputRef.current) {
                        inputRef.current.setSelectionRange(nextCursor, nextCursor);
                      }
                    });
                  }
                }
              }
            }}
          />
        );
      }}
    />
  );
}