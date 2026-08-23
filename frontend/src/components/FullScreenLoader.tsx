import { Backdrop, CircularProgress } from '@mui/material'

interface FullScreenLoaderProps {
  open: boolean
}

export function FullScreenLoader({
  open,
}: FullScreenLoaderProps) {
  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: 9999,
        color: 'white',
        cursor: 'wait',
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}