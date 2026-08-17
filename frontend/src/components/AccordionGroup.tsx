import { 
  Accordion, 
  AccordionDetails, 
  AccordionSummary, 
  Button, 
  IconButton, 
  List, 
  ListItem, 
  ListItemText, 
  Stack,
  Typography,
} from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { 
  GridDeleteIcon, 
  GridLoadIcon,
} from "@mui/x-data-grid"

import { BoxResult } from "@/components/BoxResult";
import BoxSuccessWithoutData from "@/components/BoxSuccessWithoutData";
import type { ApiState } from "@/types/form";

import type {  
  OptionsControlledBox 
} from "@shared/types/values";


interface AccordionGroupProps {
  state: ApiState,
  title: string,
  entity: string,
  values: OptionsControlledBox[]
  onAdd: (entity: string) => void
  onUpdate: (id: string | number, entity: string) => void
  onDelete: (id: string | number, entity: string) => void
}

export default function AccordionGroup({
  state, title, values, entity, onAdd, onUpdate, onDelete
}: AccordionGroupProps) {

  if (state !== "SUCCESS") {
    <BoxResult state={state} />
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
        <Typography>{title}</Typography>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          maxHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Button            
          type="button"
          variant="outlined"
          fullWidth
          onClick={() => onAdd(entity)}
        >
          Adicionar nova variável
        </Button>
        <List sx={{ my: 2, overflowY: 'auto', flex: 1, minHeight: 0 }} dense>
          { values.length === 0 && (
            <BoxSuccessWithoutData description={"Não foram encontradas variáveis para essa sessão."} />
          ) }
          {values.map((item) => (
            <ListItem
              key={item.value}
              secondaryAction={
                <Stack direction="row">
                  <IconButton
                    onClick={() => onUpdate(item.value, entity)}
                    size="small"
                  >
                    <GridLoadIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => onDelete(item.value, entity)}
                    size="small"
                  >
                    <GridDeleteIcon />
                  </IconButton>
                </Stack>
              }
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  )
}