import { 
  Box, 
  Button, 
  Link, 
  TextField 
} from '@mui/material'

import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type loginSchemaFormData } from '@/features/auth/schemas/loginSchema';
import { SpanError } from '@/styles/spanError';

export default function CardLoginFields() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<loginSchemaFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<loginSchemaFormData> = (data) => console.log(data)

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              backgroundImage: 'url(/samp_logo.svg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '120px',
              marginBottom: 8,
              width: '120px',
              textAlign: 'center'
            }}
          />
          <TextField
            {...register("email")}
            sx={{marginBottom: 4}}
            placeholder="email@exemplo.com"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            helperText={
              errors.email && <SpanError>{errors.email.message}</SpanError>
            }
          />
          <TextField
            {...register("password")}            
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            helperText={
              errors.password && <SpanError>{errors.password.message}</SpanError>
            }
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
              marginBottom: 4
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

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Entrar
          </Button>
          </form>
      </Box>    
  )
}