import { observer } from 'mobx-react-lite'
import { useStore } from '../../hooks/use-store'
import SidebarBase from './sidebar-base/SidebarBase'

const Sidebar = observer(() => {
  const { currentSize, sidebarOpen } = useStore().uiStore

  let sidebarBase: JSX.Element | null = null
  if (currentSize === 'large') {
    if (sidebarOpen) {
      sidebarBase = <SidebarBase size='maximum' />
    } else {
      sidebarBase = <SidebarBase size='minimum' />
    }
  } else if (currentSize === 'medium') {
    sidebarBase = <SidebarBase size='minimum' />
  }

  return sidebarBase
})

export default Sidebar
