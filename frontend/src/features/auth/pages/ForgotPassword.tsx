import { useMediaQuery } from '@mui/material'

import CardForgotPassword from '@/features/auth/components/CardForgotPassword'
import CardForgotPasswordFields from '@/features/auth/components/CardForgotPasswordFields'


export default function ForgotPasswordPage() {
  const isMobile = useMediaQuery('(max-width:700px)')
  
  return (
    <>
      { isMobile ? (
        <CardForgotPasswordFields />        
      ) : (
        <CardForgotPassword />
      ) }    
    </>
  )
}