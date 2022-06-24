import { observer } from 'mobx-react-lite'
import { PropsWithChildren } from 'react'
import { useStore } from '../../hooks/use-store'
import styles from './MainContent.module.css'

const MainContent = observer((props: PropsWithChildren<object>) => {
  const { uiStore, userStore } = useStore()

  const containerStyles = [styles.container]

  if (userStore.currentUser) {
    if (uiStore.currentSize === 'large') {
      if (uiStore.sidebarOpen) {
        containerStyles.push(styles.containerLarge)
      } else {
        containerStyles.push(styles.containerMedium)
      }
    } else if (uiStore.currentSize === 'medium') {
      containerStyles.push(styles.containerMedium)
    } else {
      containerStyles.push(styles.containerMobile)
    }
  }

  return (
    <div className={containerStyles.join(' ')}>
      <div className='container-fluid'>
        <div>{props.children}</div>
      </div>
    </div>
  )
})

export default MainContent
