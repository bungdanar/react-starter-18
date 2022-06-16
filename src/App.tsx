import { observer } from 'mobx-react-lite'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useStore } from './hooks/use-store'
import { AppRoutes } from './routes'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import Navbar from './components/navbar/Navbar'
import MainContent from './components/main-content/MainContent'
import { useEffect } from 'react'
import FloatingSidebar from './components/sidebar/floating-sidebar/FloatingSidebar'
import Sidebar from './components/sidebar/Sidebar'

const App = observer(() => {
  const { themePrimaryColor, handleScreenResizeListener } = useStore().uiStore

  const theme = createTheme({
    palette: {
      primary: {
        main: themePrimaryColor,
      },
    },
  })

  useEffect(() => {
    handleScreenResizeListener()
    window.addEventListener('resize', handleScreenResizeListener)

    return () =>
      window.removeEventListener('resize', handleScreenResizeListener)
  }, [handleScreenResizeListener])

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <FloatingSidebar />
        <header>
          <Navbar />
        </header>
        <main>
          <Sidebar />
          <MainContent>
            <AppRoutes />
          </MainContent>
        </main>
      </LocalizationProvider>
    </ThemeProvider>
  )
})

export default App
