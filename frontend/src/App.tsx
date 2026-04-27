import { ThemeProvider } from '@mui/material/styles'
import LoginPage from '@/features/auth/pages/Login'

import { theme } from '@/styles/themes'
import './styles/global.css'

function App() {
  return (
    <ThemeProvider theme={ theme }>
      <LoginPage />
    </ThemeProvider>
  )
}

export default App