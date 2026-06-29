import { useNavigate } from "react-router";

import { 
  Avatar, 
  Box, 
  IconButton, 
  ListItem, 
  ListItemAvatar, 
  ListItemText 
} from "@mui/material";
import { GridDeleteIcon, GridLoadIcon } from "@mui/x-data-grid";
import FolderIcon from '@mui/icons-material/Folder';

import { formatDateTimeBrazil } from "@/utils/formatDateTimeBrazil";
import type { AppoitmentItem } from "@shared/types/appointment";


interface AppoinentmentListItemProps {
  appointment: AppoitmentItem
  onDeleteItem: (id: string) => void
}

export default function AppoinentmentListItem({
  appointment, onDeleteItem
}: AppoinentmentListItemProps) {

  const navigate = useNavigate();

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
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => navigate(`/cliente/${appointment.clientId}/agenda/${appointment.id}`)}
          >
            <GridLoadIcon fontSize="large" />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onDeleteItem(appointment.id)}
          >
            <GridDeleteIcon fontSize="large" />
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