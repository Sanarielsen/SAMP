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

  const extractDigits = (value: string) => {
    return value.replace(/\D/g, "");
  };

  const formatValueWithMask = (value: string) => {
    if (!value) return "";
    
    const digits = extractDigits(value);
    const formattedArr = mask.split("");
    let digitIndex = 0;
    
    for (let i = 0; i < mask.length && digitIndex < digits.length; i++) {
      if (mask[i] === "9") {
        formattedArr[i] = digits[digitIndex];
        digitIndex++;
      }
    }
    
    let result = "";
    for (let i = 0; i < formattedArr.length; i++) {
      if (formattedArr[i] === "9") break;
      result += formattedArr[i];
    }
    
    return result;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        
        const storedValue = field.value || "";
        
        const displayValue = formatValueWithMask(storedValue);

        return (
          <TextField
            {...textFieldProps}
            {...field}
            inputRef={(e) => {
              field.ref(e);
              inputRef.current = e;
            }}
            value={displayValue}
            onChange={(event) => {
              const inputEl = event.target;
              const inputValue = inputEl.value;
              const cursorPos = inputEl.selectionStart || 0;

              const newDigits = extractDigits(inputValue);
              const oldDigits = extractDigits(storedValue);

              if (newDigits.length < oldDigits.length) {
                let digitsPassed = 0;
                let deletedDigitPosition = -1;

                for (let i = 0; i < mask.length && digitsPassed < oldDigits.length; i++) {
                  if (mask[i] === "9") {
                    if (i >= cursorPos) {
                      deletedDigitPosition = digitsPassed;
                      break;
                    }
                    digitsPassed++;
                  }
                }

                if (deletedDigitPosition === -1) {
                  deletedDigitPosition = oldDigits.length - 1;
                }

                const updatedValue = oldDigits.slice(0, deletedDigitPosition) + oldDigits.slice(deletedDigitPosition + 1);
                field.onChange(updatedValue);
                textFieldProps.onChange?.(event);

                requestAnimationFrame(() => {
                  if (inputRef.current) {
                    let cursorIndex = 0;
                    let digitsFound = 0;
                    for (let i = 0; i < mask.length; i++) {
                      if (mask[i] === "9") {
                        if (digitsFound === deletedDigitPosition) {
                          cursorIndex = i;
                          break;
                        }
                        digitsFound++;
                      }
                      cursorIndex = i + 1;
                    }
                    inputRef.current.setSelectionRange(cursorIndex, cursorIndex);
                  }
                });
              } else if (newDigits.length > oldDigits.length) {
                const lastDigit = newDigits[newDigits.length - 1];
                
                if (/\d/.test(lastDigit)) {
                  field.onChange(newDigits);
                  textFieldProps.onChange?.(event);

                  requestAnimationFrame(() => {
                    if (inputRef.current) {
                      const formattedDisplay = formatValueWithMask(newDigits);
                      inputRef.current.setSelectionRange(formattedDisplay.length, formattedDisplay.length);
                    }
                  });
                }
              }
            }}
          />
        );
      }}
    />
  );
}