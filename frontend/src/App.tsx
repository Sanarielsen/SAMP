import { ThemeProvider } from '@mui/material/styles'
import ForgotPasswordPage from '@/features/auth/pages/ForgotPassword'

import { theme } from '@/styles/themes'
import './styles/global.css'

function App() {
  return (
    <ThemeProvider theme={ theme }>
      <ForgotPasswordPage />
    </ThemeProvider>
  )
}

export default App