import { 
  useRef, 
  type RefCallback 
} from 'react';

import { 
  Controller, 
  type FieldValues, 
  type FieldPath, 
  type UseControllerProps 
} from 'react-hook-form';

import 
  TextField, 
  { type TextFieldProps } 
from '@mui/material/TextField';


export type MaskType = string | ((value: string) => string);

export interface ControlledInputMaskProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<TextFieldProps, 'name' | 'defaultValue'> {
  name: TName;
  control: UseControllerProps<TFieldValues, TName>['control'];
  mask?: MaskType;
  rules?: UseControllerProps<TFieldValues, TName>['rules'];
  defaultValue?: UseControllerProps<TFieldValues, TName>['defaultValue'];
  showMaskHelperText?: boolean;
}

const applyGenericMask = (rawValue: string, maskProp?: MaskType): string => {
  if (!rawValue || !maskProp) return rawValue;

  if (typeof maskProp === 'function') {
    return maskProp(rawValue);
  }

  if (typeof maskProp === 'string') {
    const cleanDigits = rawValue.replace(/[^a-zA-Z0-9]/g, '');
    let result = '';
    let cleanIndex = 0;

    for (let i = 0; i < maskProp.length && cleanIndex < cleanDigits.length; i++) {
      const maskChar = maskProp[i];
      const valChar = cleanDigits[cleanIndex];

      if (maskChar === '9') {
        if (/\d/.test(valChar)) {
          result += valChar;
          cleanIndex++;
        } else {
          cleanIndex++;
          i--;
        }
      } else if (maskChar === 'A' || maskChar === 'a') {
        if (/[a-zA-Z]/.test(valChar)) {
          result += valChar;
          cleanIndex++;
        } else {
          cleanIndex++;
          i--;
        }
      } else if (maskChar === '*') {
        result += valChar;
        cleanIndex++;
      } else {
        result += maskChar;
        if (valChar === maskChar) {
          cleanIndex++;
        }
      }
    }

    return result;
  }

  return rawValue;
};

const getMaskMaxLength = (currentValue: string, maskProp?: MaskType): number => {
  if (typeof maskProp === 'string') {
    return maskProp.length;
  }
  if (typeof maskProp === 'function') {
    const formatted = maskProp(currentValue);
    return formatted ? formatted.length : Infinity;
  }
  return Infinity;
};

export const ControlledInputMask = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  mask,
  rules = undefined,
  defaultValue = undefined,
  onChange: customOnChange = undefined,
  showMaskHelperText = false,
  helperText,
  slotProps,
  ...props
}: ControlledInputMaskProps<TFieldValues, TName>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      const input = event.currentTarget;
      const cursorPos = input.selectionStart ?? 0;

      if (cursorPos > 0 && /[^a-zA-Z0-9]/.test(input.value[cursorPos - 1])) {
        event.preventDefault();
        input.setSelectionRange(cursorPos - 1, cursorPos - 1);
      }
    }
  };

  const getComputedHelperText = (currentValue: string) => {
    if (helperText) return helperText;

    if (!showMaskHelperText || !mask) return undefined;

    if (typeof mask === 'string') {
      return `Formato: ${mask}`;
    }

    if (typeof mask === 'function') {
      const masked = mask(currentValue);
      return masked ? `Formato: ${masked}` : undefined;
    }

    return undefined;
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, value, ref: fieldRef, ...fieldProps }, fieldState: { error } }) => {
        const currentValue = (value as string) || '';

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const input = event.target;
          const rawValue = input.value;
          const cursorPos = input.selectionStart ?? 0;
          const nativeEvent = event.nativeEvent as InputEvent;
          const isInsert = nativeEvent.inputType === 'insertText';

          const maxLength = getMaskMaxLength(currentValue, mask);

          if (isInsert && currentValue.length >= maxLength) {
            requestAnimationFrame(() => {
              const originalPos = Math.max(0, cursorPos - 1);
              if (inputRef.current) {
                inputRef.current.setSelectionRange(originalPos, originalPos);
              }
            });
            return;
          }

          const formattedValue = applyGenericMask(rawValue, mask);

          onChange(formattedValue);

          if (customOnChange) {
            customOnChange(event);
          }

          requestAnimationFrame(() => {
            let nextCursor = cursorPos;

            if (isInsert && /[^a-zA-Z0-9]/.test(formattedValue[cursorPos - 1])) {
              nextCursor = cursorPos + 1;
            }

            if (inputRef.current) {
              inputRef.current.setSelectionRange(nextCursor, nextCursor);
            }
          });
        };

        const handleInputRef: RefCallback<HTMLInputElement> = (node) => {
          inputRef.current = node;
          if (typeof fieldRef === 'function') {
            fieldRef(node);
          } else if (fieldRef && typeof fieldRef === 'object') {
            (fieldRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
          }
        };

        const finalHelperText = error?.message || getComputedHelperText(currentValue);

        return (
          <TextField
            {...fieldProps}
            {...props}
            value={currentValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            inputRef={handleInputRef}
            error={!!error}
            helperText={finalHelperText}
            slotProps={{
              ...slotProps,
              htmlInput: {
                autoComplete: 'off',
                ...slotProps?.htmlInput,
              },
            }}
          />
        );
      }}
    />
  );
};

export default ControlledInputMask;