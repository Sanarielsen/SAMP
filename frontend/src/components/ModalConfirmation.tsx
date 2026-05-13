import { 
  Box,
  Button,
  Grid,
  Modal,
  Typography
} from "@mui/material"
import { GridCloseIcon } from "@mui/x-data-grid"


interface ModalConfirmationProps {
  open: boolean
  title: string,
  description: string,
  handleAnswer: (answer: boolean) => void
  handleClose: () => void
}

export default function ModalConfirmation({ open, title, description, handleAnswer, handleClose }: ModalConfirmationProps) {
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
            {title}
          </Typography>

          <Button onClick={handleClose}>
            <GridCloseIcon />
          </Button>
        </Box>

        <Box
          sx={{
            py: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="body2"
            component="p"
          >
            {description}
          </Typography>
        </Box>

        <Grid
          container 
          spacing={2} 
          sx={{
            textAlign: { xs: "center", md: "left" }
          }}
        >
          <Grid 
            size={{ xs: 12, md: 6 }}
            sx={{pt: { xs: 1, md: 2 }, pr: { xs: 0, md: 2 }}}
          >
            <Button              
              type="button"
              variant="outlined"
              fullWidth
              onClick={() => handleAnswer(true)}
            >
              Não
            </Button>
          </Grid>
          <Grid 
            size={{ xs: 12, md: 6 }}
            sx={{pt:{ xs: 1, md: 2 }, pl: { xs: 0, md: 2 }}}
          >
            <Button
              type="button"
              variant="contained"
              color={"primary"}
              fullWidth
              onClick={() => handleAnswer(false)}
            >
              Sim
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}