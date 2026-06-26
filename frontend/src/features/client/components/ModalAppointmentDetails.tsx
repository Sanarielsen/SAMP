import { useQuery } from "@tanstack/react-query"

import { 
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material"
import { GridCloseIcon } from "@mui/x-data-grid"

import { optionsQueryGetAppointmentWithDetails } from "@/features/client/api/queryGetAppointmentWithDetails"
import { emptyAppointmentWithDetails } from "@/features/client/utils/mockConstants"
import type { Field } from "@/utils/field"

import type { Appointment, DetailAppointmentDTO } from "@shared/types/appointment"


interface ModalAppointmentDetailsProps {
  open: boolean
  appointment: Appointment
  fields: Field<DetailAppointmentDTO>[] 
  handleClose: () => void
}

export default function ModalAppointmentDetails({ open, appointment, fields, handleClose }: ModalAppointmentDetailsProps) {

  const { 
    data: currentAppointmentWithDetails,
    isSuccess,
  } = useQuery(
    optionsQueryGetAppointmentWithDetails(appointment.id, !!appointment.id)
  )

  console.log("Agenda: ", currentAppointmentWithDetails)

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
            Detalhes de uma agenda
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
          <TableContainer 
            sx={{
              "& .MuiTableCell-head": {
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                fontWeight: "bold",
              },
            }} 
            component={Paper}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Título</TableCell>
                  <TableCell>Descricão</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fields.map((field) => (
                  <TableRow key={field.title}>
                    <TableCell>
                      {field.title}
                    </TableCell>
                    <TableCell>
                      {field.get(isSuccess ?
                        currentAppointmentWithDetails :
                        emptyAppointmentWithDetails
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Box>
    </Modal>
  )
}