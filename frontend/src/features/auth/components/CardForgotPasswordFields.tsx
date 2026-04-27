import { 
  Box, 
  Button,
  TextField, 
  Typography
} from '@mui/material'

export default function CardForgotPassword() {

  return (
    <Box
      sx={{
        minWidth: '35%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        gap: 2,
      }}
    >
      <Box
        sx={{
          backgroundImage: 'url(/samp_logo.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '120px',
          marginBottom: 4,
          width: '120px',
        }}
      />

      <Typography variant='body1' component="span">
        Para recuperar sua senha, ensira seu e-mail abaixo para que possamos enviar
        um link de recuperacão em sua caixa de entrada do e-mail.
      </Typography>

      <TextField
        label="Email"
        type="email"
        fullWidth
        variant="outlined"
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ marginTop: 2 }}
      >
        Enviar código de recuperacão
      </Button>
    </Box>
  )
}