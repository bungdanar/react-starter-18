import { observer } from 'mobx-react-lite'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useStore } from './hooks/use-store'
import { AppRoutes } from './routes'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import Navbar from './components/navbar/Navbar'
import MainContent from './components/main-content/MainContent'

const App = observer(() => {
  const { themePrimaryColor } = useStore().uiStore

  const theme = createTheme({
    palette: {
      primary: {
        main: themePrimaryColor,
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <header>
          <Navbar />
        </header>
        <main>
          <MainContent>
            <AppRoutes />
          </MainContent>
        </main>
      </LocalizationProvider>
    </ThemeProvider>
  )
})

export default App
