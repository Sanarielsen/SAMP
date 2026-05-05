import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { theme } from '@/styles/themes'
import { queryClient } from '@/lib/query-client'
import Router from './routes/routes'
import './styles/global.css'
import { AuthProvider } from './auth/AuthProvider'

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </QueryClientProvider>
      </StyledThemeProvider>
    </MuiThemeProvider>
  )
}

export default App