import { QueryClientProvider } from '@tanstack/react-query'

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { AuthProvider } from '@/auth/AuthProvider'
import { queryClient } from '@/lib/query-client'
import { theme } from '@/styles/themes'
import Router from '@/routes'
import '@/styles/global.css'

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