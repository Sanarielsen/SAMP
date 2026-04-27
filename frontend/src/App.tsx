import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { theme } from '@/styles/themes'
import Router from './routes'
import './styles/global.css'

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <Router>
          {/* Your routes */}
        </Router>
      </StyledThemeProvider>
    </MuiThemeProvider>
  )
}

export default App