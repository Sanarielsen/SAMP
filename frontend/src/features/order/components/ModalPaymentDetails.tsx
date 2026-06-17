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

import DataTableColumnsInstallments from "@/features/order/components/DataTableColumnsInstallments"
import DataTable from "@/components/DataTable"
import type { Field } from "@/utils/field"

import type { PaymentDetailDTO } from "@shared/types/payment"


interface ModalPaymentDetailsProps {
  open: boolean
  payment: PaymentDetailDTO
  fields: Field<PaymentDetailDTO>[] 
  handleClose: () => void
}

export default function ModalPaymentDetails({ 
  open, 
  payment, 
  fields, 
  handleClose 
}: ModalPaymentDetailsProps) {

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

          maxHeight: "80vh",
          overflowY: "auto",

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
            Detalhes de um pagamento
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
                      {field.get(payment)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pt: 3, pb: 2
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h5"
          >
            Detalhes das parcelas desse pagamento
          </Typography>
        </Box>

        <Grid
          sx={{ pt: 3, pb: 2 }}
        >
          <DataTable
            state="SUCCESS"
            rows={payment.installments}
            columns={DataTableColumnsInstallments()}
          />
        </Grid>
      </Box>
    </Modal>
  )
}