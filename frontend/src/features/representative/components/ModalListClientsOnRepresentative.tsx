import { 
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography
} from "@mui/material"
import { GridCloseIcon } from "@mui/x-data-grid"

import type { RepresentativeDetailsDTO, RepresentativeOptionDTO } from "@shared/types/representative"
import { optionsGetRepresentativeWithClients } from "../api/getRepresentativeWithClients"
import { useQuery } from "@tanstack/react-query"


interface ModalListClientsOnRepresentativeProps {
  open: boolean
  representative: RepresentativeDetailsDTO
  handleClose: () => void
}

export default function ModalListClientsOnRepresentative({ 
  open, representative, handleClose 
}: ModalListClientsOnRepresentativeProps) {

  const { 
      data: listRepresentativeClients = [],
  } = useQuery(
    optionsGetRepresentativeWithClients(representative.id, open)
  )

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",

          width: "70%",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h5"
          >
            Empresas que este representante pertence:
          </Typography>

          <Button onClick={handleClose}>
            <GridCloseIcon />
          </Button>
        </Box>

        <Grid
          container
          spacing={4}
          sx={{ pt: 3, pb: 2 }}
        >
          <List>
            {listRepresentativeClients.map(
              (client: RepresentativeOptionDTO) => (
                <ListItem key={client.value}>
                  <ListItemText
                    primary={client.label}
                  />
                </ListItem>
              )
            )}
          </List>
        </Grid>
      </Box>
    </Modal>
  )
}