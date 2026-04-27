import { ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import { theme } from '@/styles/themes'

function App() {
  return (
    <ThemeProvider theme={ theme }>
      <Typography sx={{
        color: 'primary.dark'
      }}>Hello world</Typography>
    </ThemeProvider>
  )
}

export default App