import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { QueryClientProvider } from '@tanstack/react-query'

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

import { AuthProvider } from '@/auth/AuthProvider'
import { queryClient } from '@/lib/query-client'
import ViewportBadge from '@/components/ViewportBagde'
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
            <ViewportBadge />
          </AuthProvider>
        </QueryClientProvider>
      </StyledThemeProvider>
    </MuiThemeProvider>
  )
}

export default App