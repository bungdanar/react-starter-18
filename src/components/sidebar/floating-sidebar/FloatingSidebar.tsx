import { observer } from 'mobx-react-lite'
import { useStore } from '../../../hooks/use-store'
import Backdrop from '../backdrop/Backdrop'
import SidebarBase from '../sidebar-base/SidebarBase'

const FloatingSidebar = observer(() => {
  const { openFloatingSidebar } = useStore().uiStore

  let floatingSidebar: JSX.Element | null = null
  let backdrop: JSX.Element | null = null

  if (openFloatingSidebar) {
    floatingSidebar = <SidebarBase size='floating' />
    backdrop = <Backdrop />
  }

  return (
    <>
      {floatingSidebar}
      {backdrop}
    </>
  )
})

export default FloatingSidebar
