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
  Typography,
} from "@mui/material"
import { GridCloseIcon } from "@mui/x-data-grid"

import type { Field } from "@/utils/field"
import { ModalContainer } from "@/styles/modalContainer"


interface ModalViewEntityDetailsProps<T> {
  open: boolean
  title: string
  data: T
  fields: Field<T>[]
  handleClose: () => void
}

export default function ModalViewEntityDetails<T>({ 
  open, title, data, fields, handleClose 
}: ModalViewEntityDetailsProps<T>) {

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <ModalContainer>
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
            {title}
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
                {fields
                  .filter((field) => {
                    const value = field.get(data)
                    return value !== undefined && value !== null && value !== ""
                  })
                  .map((field) => (
                    <TableRow key={field.title}>
                      <TableCell>
                        {field.title}
                      </TableCell>
                      <TableCell>
                        {field.get(data)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </ModalContainer>
    </Modal>
  )
}