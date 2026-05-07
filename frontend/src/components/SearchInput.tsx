import { Autocomplete, Stack, TextField } from "@mui/material";

export type ListOptionsType = {
  id: number,
  name: string,
}

interface SearchInputProps {
  name: string
  label: string,
  data: ListOptionsType[]
}

export default function SearchInput({
  name, label, data
}: SearchInputProps) {

  return (
    <Stack spacing={2}>
      <Autocomplete
        freeSolo
        fullWidth
        id={name}
        disableClearable
        options={data.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            slotProps={{
              ...params.slotProps,
              input: {
                ...params.slotProps.input,
                type: 'search',
              },
            }}
          />
        )}
      />
    </Stack>
  );
}

