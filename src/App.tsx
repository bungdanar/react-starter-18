import { observer } from 'mobx-react-lite'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useStore } from './hooks/use-store'
import { AppRoutes } from './routes'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

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
        <div className='container-fluid'>
          <AppRoutes />
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  )
})

export default App
