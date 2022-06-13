import { observer } from 'mobx-react-lite'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useStore } from './hooks/use-store'
import { AppRoutes } from './routes'

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
      <div className='container-fluid'>
        <AppRoutes />
      </div>
    </ThemeProvider>
  )
})

export default App
