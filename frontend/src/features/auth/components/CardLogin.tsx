import {
  Card,
  CardMedia
} from '@mui/material'

import CardFields from "@/features/auth/components/CardLoginFields"
import cardImage from "@/features/auth/assets/login_background.jpg"

export default function CardLogin() {

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
      <CardFields />
    </Card>
  )
}