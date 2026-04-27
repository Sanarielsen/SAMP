import { 
  Box, 
  Button, 
  Link, 
  TextField 
} from '@mui/material'

export default function CardLoginFields() {

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
      <TextField
        label="Email"
        type="email"
        fullWidth
        variant="outlined"
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        variant="outlined"
        helperText={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%'
            }}
          >
            <Link
              href="/forgot-password" 
              underline="hover"
              sx={{ cursor: 'pointer' }}
            >
              Esqueci a senha?
            </Link>
          </Box>
        }
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ marginTop: 2 }}
      >
        Entrar
      </Button>
    </Box>
  )
}