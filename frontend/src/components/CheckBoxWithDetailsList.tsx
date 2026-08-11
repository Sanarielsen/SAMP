import * as React from 'react';
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import {
  Checkbox,
  FormHelperText,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import BoxSuccessWithoutData from '@/components/BoxSuccessWithoutData';


interface CheckboxListProps<T, TForm extends FieldValues> {
  items: T[];
  control: Control<TForm>;
  name: Path<TForm>;
  getItemId: (item: T) => string | number;
  getItemLabel: (item: T) => React.ReactNode;

  emptyDescription?: string;
}

export function CheckBoxWithDetailsList<
  T,
  TForm extends FieldValues,
>({
  items,
  control,
  name,
  getItemId,
  getItemLabel,
  emptyDescription = 'Nenhuma publicação encontrada.',
}: CheckboxListProps<T, TForm>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selectedItems = (field.value ?? []) as T[];

        const handleToggle = (item: T) => {
          const itemId = getItemId(item);

          const isChecked = selectedItems.some(
            (selectedItem) =>
              getItemId(selectedItem) === itemId,
          );

          if (isChecked) {
            field.onChange(
              selectedItems.filter(
                (selectedItem) =>
                  getItemId(selectedItem) !== itemId,
              ),
            );

            return;
          }

          field.onChange([...selectedItems, item]);
        };

        if (items.length === 0) {
          return (
            <BoxSuccessWithoutData
              description={emptyDescription}
            />
          );
        }

        return (
          <>
            <List
              sx={{
                width: '100%',
                bgcolor: 'background.paper',
              }}
            >
              {items.map((item) => {
                const id = getItemId(item);
                const labelId = `checkbox-list-label-${id}`;

                const checked = selectedItems.some(
                  (selectedItem) =>
                    getItemId(selectedItem) === id,
                );

                return (
                  <ListItem
                    key={id}
                    disablePadding
                  >
                    <ListItemButton
                      onClick={() => handleToggle(item)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked}
                          tabIndex={-1}
                          disableRipple
                          slotProps={{
                            input: {
                              'aria-labelledby': labelId,
                            },
                          }}
                        />
                      </ListItemIcon>

                      <ListItemText
                        id={labelId}
                        primary={getItemLabel(item)}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>

            {fieldState.error && (
              <FormHelperText error>
                {fieldState.error.message}
              </FormHelperText>
            )}
          </>
        );
      }}
    />
  );
}