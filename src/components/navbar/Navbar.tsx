import { Logout } from '@mui/icons-material'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../hooks/use-store'
import { CustomSwal } from '../../utils/custom-swal'
import styles from './Navbar.module.css'

const Navbar = observer(() => {
  const { uiStore, userStore } = useStore()

  const rootStyles = [
    styles.customNavbar,
    'navbar fixed-top navbar-dark bg-dark',
  ]
  const logoutStyles = [styles.logout, 'navbar-brand']

  const handleLogout = async () => {
    CustomSwal.asyncSubmitWrapper({
      provideConfirmation: false,
      provideSuccess: false,
      loadingMsg: 'Logging out...',
      submitHandler: async () => {
        await userStore.logout()
      },
    })
  }

  return (
    <nav className={rootStyles.join(' ')}>
      <div className='container-fluid'>
        <div className='navbar-brand'>
          <span className={styles.burger} onClick={uiStore.handleToggleSidebar}>
            &#8801;
          </span>
          <span>My App</span>
        </div>
        {uiStore.currentSize !== 'mobile' ? (
          <div className='d-flex justify-content-end'>
            <div className='navbar-brand'>My Name</div>
            <div className={logoutStyles.join(' ')} onClick={handleLogout}>
              <Logout />
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  )
})

export default Navbar
