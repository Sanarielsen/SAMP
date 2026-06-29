import { useForm, type SubmitHandler } from "react-hook-form"

import { 
  Box, 
  Button, 
  Link, 
  TextField 
} from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, type LoginSchemaFormData } from '@/features/auth/schemas/loginSchema';
import { SpanError } from '@/styles/spanError';
import { useAuth } from '@/auth/AuthProvider';
import { useLogin } from '@/features/auth/api/AuthMutation';
import { useNavigate } from 'react-router';


export default function CardLoginFields() {
  
  const { signIn } = useAuth()
  const mutation = useLogin()
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginSchemaFormData>({
    resolver: zodResolver(loginSchema),
  });


  const onSubmit: SubmitHandler<LoginSchemaFormData> = async (data) => {

    try {
      const response = await mutation.mutateAsync(data)
      
      signIn(response.token)
      navigate('/inicio')
    } catch {
      setError('password', {
        type: 'manual',
        message: 'Credenciais inválidas.',
      })
    }
  }

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
          loading={mutation.isPending}
          disabled={mutation.isPending}
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Entrar
        </Button>
        </form>
    </Box>    
  )
}