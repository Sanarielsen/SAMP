import { useMediaQuery } from '@mui/material'

import CardFields from '@/features/auth/components/CardFields'
import CardLogin from '@/features/auth/components/CardLogin'

export default function LoginPage() {
  const isMobile = useMediaQuery('(max-width:700px)')

  return (
    <>
      { isMobile ? (
        <CardFields />        
      ) : (
        <CardLogin />
      ) }    
    </>
  )
}