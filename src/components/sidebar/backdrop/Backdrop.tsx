import { useStore } from '../../../hooks/use-store'
import styles from './Backdrop.module.css'

export default function Backdrop() {
  const { handleCloseFloatingSidebar } = useStore().uiStore

  return (
    <div className={styles.backdrop} onClick={handleCloseFloatingSidebar}></div>
  )
}
