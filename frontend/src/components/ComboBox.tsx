import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import type { OptionsControlledBox } from "@shared/types/values";

interface ComboBoxProps {
  label: string,
  value: string,
  options: OptionsControlledBox[],
  onChangeOption: (event: SelectChangeEvent<string>) => void
}


export default function ComboBox({
  label, value, options, onChangeOption
}: ComboBoxProps) {

  return (
    <FormControl variant="outlined" sx={{ m: 1, minWidth: 300 }}>
      <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={value}
        onChange={onChangeOption}
        label={label}
      >
        {options.map((option) => (
          <MenuItem value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}