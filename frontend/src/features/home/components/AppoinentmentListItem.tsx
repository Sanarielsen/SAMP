import { 
  Avatar, 
  Box, 
  IconButton, 
  ListItem, 
  ListItemAvatar, 
  ListItemText 
} from "@mui/material";
import { 
  GridCheckCircleIcon,
   GridDeleteIcon } from "@mui/x-data-grid";
import FolderIcon from '@mui/icons-material/Folder';

import { formatDateTimeBrazil } from "@/utils/formatDateTimeBrazil";

import type { AppoitmentItem } from "@shared/types/appointment";


interface AppoinentmentListItemProps {
  appointment: AppoitmentItem
  onCompleteItem: (id: string) => void
  onDeleteItem: (id: string) => void
}

export default function AppoinentmentListItem({
  appointment, onCompleteItem, onDeleteItem
}: AppoinentmentListItemProps) {

  const orderTitle = appointment.orderTitle || '-'

  return (
    <ListItem
      secondaryAction={
        <Box
          component="div"
          sx={{
            display: 'flex',
            gap: 2,
          }}
        >
          <IconButton edge="end" aria-label="delete">
            <GridCheckCircleIcon 
              color="primary" 
              fontSize="large" 
              onClick={() => onCompleteItem(appointment.id)}
            />
          </IconButton>
          <IconButton edge="end" aria-label="delete">
            <GridDeleteIcon 
              fontSize="large" 
              onClick={() => onDeleteItem(appointment.id)}
            />
          </IconButton>
        </Box>
      }
    >
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`${appointment.description} - ${formatDateTimeBrazil(appointment.appointmentAt)}`}
        secondary={`${appointment.clientName} | ${orderTitle}`}
      />
    </ListItem>
  )
}