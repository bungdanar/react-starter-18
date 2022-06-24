import { observer } from 'mobx-react-lite'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useStore } from './hooks/use-store'
import { AppRoutes, LoginRoutes } from './routes'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import Navbar from './components/navbar/Navbar'
import MainContent from './components/main-content/MainContent'
import { useEffect } from 'react'
import FloatingSidebar from './components/sidebar/floating-sidebar/FloatingSidebar'
import Sidebar from './components/sidebar/Sidebar'
import Fallback from './components/fallback/Fallback'

const App = observer(() => {
  const { uiStore, userStore } = useStore()

  const theme = createTheme({
    palette: {
      primary: {
        main: uiStore.themePrimaryColor,
      },
    },
  })

  useEffect(() => {
    uiStore.handleScreenResizeListener()
    window.addEventListener('resize', uiStore.handleScreenResizeListener)

    return () =>
      window.removeEventListener('resize', uiStore.handleScreenResizeListener)
  }, [uiStore])

  useEffect(() => {
    userStore.checkCurrentUser()
  }, [userStore])

  if (!uiStore.isAppLoaded) {
    return <Fallback />
  } else {
    let app: JSX.Element = <LoginRoutes />
    let navbar: JSX.Element | null = null
    let sidebar: JSX.Element | null = null
    let floatingSidebar: JSX.Element | null = null

    if (userStore.currentUser) {
      app = <AppRoutes />
      navbar = <Navbar />
      sidebar = <Sidebar />
      floatingSidebar = <FloatingSidebar />
    }

    return (
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          {floatingSidebar}
          <header>{navbar}</header>
          <main>
            {sidebar}
            <MainContent>{app}</MainContent>
          </main>
        </LocalizationProvider>
      </ThemeProvider>
    )
  }
})

export default App
