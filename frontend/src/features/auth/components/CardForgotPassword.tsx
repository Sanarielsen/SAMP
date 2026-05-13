import {
  Card,
  CardMedia
} from '@mui/material'

import CardForgotPasswordFields from "@/features/auth/components/CardForgotPasswordFields"
import cardImage from "@/features/auth/assets/login_background.jpg"


export default function CardForgotPassword() {

  return (
    <Card
      sx={{
        display: 'flex',
        height: '100vh'
      }}
    >
      <CardMedia
        component="img"
        image={cardImage}
        alt="Login background"
        sx={{
          width: '65%',
          objectFit: 'cover',
        }}
      />      
      <CardForgotPasswordFields />
    </Card>
  )
}