import { Snackbar, Alert } from '@mui/material'

type ToastProps = {
  open: boolean
  message: string
  severity?: 'success' | 'error' | 'info' | 'warning'
  onClose: () => void
}

export default function ToastContainer({
  open,
  message,
  severity = 'success',
  onClose,
}: ToastProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  )
}