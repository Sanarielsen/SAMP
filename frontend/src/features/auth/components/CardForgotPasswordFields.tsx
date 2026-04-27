import { 
  Box, 
  Button,
  TextField, 
  Typography
} from '@mui/material'
import { 
  useForm,
  type SubmitHandler 
} from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';

import { 
  forgotPasswordSchema, 
  type forgotPasswordSchemaFormData 
} from '@/features/auth/schemas/forgotPassword';
import { SpanError } from '@/styles/spanError';

export default function CardForgotPassword() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<forgotPasswordSchemaFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  
  const onSubmit: SubmitHandler<forgotPasswordSchemaFormData> = (data) => console.log(data)

  return (
    <form onSubmit={ handleSubmit(onSubmit) } >
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
          {...register("email")}
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          helperText={
            errors.email && <SpanError>{errors.email.message}</SpanError>
          }
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Enviar código de recuperacão
        </Button>
      </Box>
    </form>
  )
}