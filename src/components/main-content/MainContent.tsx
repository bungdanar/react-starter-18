import { observer } from 'mobx-react-lite'
import { PropsWithChildren } from 'react'
import { useStore } from '../../hooks/use-store'
import styles from './MainContent.module.css'

const MainContent = observer((props: PropsWithChildren<object>) => {
  const { currentSize, sidebarOpen } = useStore().uiStore

  const containerStyles = [styles.container]

  //   if (currentUser) {

  //   }

  if (currentSize === 'large') {
    if (sidebarOpen) {
      containerStyles.push(styles.containerLarge)
    } else {
      containerStyles.push(styles.containerMedium)
    }
  } else if (currentSize === 'medium') {
    containerStyles.push(styles.containerMedium)
  } else {
    containerStyles.push(styles.containerMobile)
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
