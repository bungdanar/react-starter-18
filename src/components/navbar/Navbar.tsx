import { Logout } from '@mui/icons-material'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../hooks/use-store'
import styles from './Navbar.module.css'

const Navbar = observer(() => {
  const { currentSize, handleToggleSidebar } = useStore().uiStore

  const rootStyles = [
    styles.customNavbar,
    'navbar fixed-top navbar-dark bg-dark',
  ]
  const logoutStyles = [styles.logout, 'navbar-brand']

  return (
    <nav className={rootStyles.join(' ')}>
      <div className='container-fluid'>
        <div className='navbar-brand'>
          <span className={styles.burger} onClick={handleToggleSidebar}>
            &#8801;
          </span>
          <span>My App</span>
        </div>
        {currentSize !== 'mobile' ? (
          <div className='d-flex justify-content-end'>
            <div className='navbar-brand'>My Name</div>
            <div className={logoutStyles.join(' ')}>
              <Logout />
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  )
})

export default Navbar
