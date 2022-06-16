// /** @jsxImportSource @emotion/react */
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../hooks/use-store'
import styles from './SidebarBase.module.css'
import { css } from '@emotion/react'

type SidebarBaseSize = 'maximum' | 'minimum' | 'floating'

interface SidebarBaseProps {
  size: SidebarBaseSize
}

const SidebarBase = observer(({ size }: SidebarBaseProps) => {
  const {
    themePrimaryColor,
    themeSidebarFontSize,
    // handleCloseFloatingSidebar,
  } = useStore().uiStore

  const rootStyles = [styles.sidebarBase]
  const menuContainerStyles = ['d-flex']

  switch (size) {
    case 'maximum': {
      rootStyles.push(styles.sideBarMaximum)
      menuContainerStyles.push('flex-row')
      break
    }

    case 'minimum': {
      rootStyles.push(styles.sidebarMinimum)
      menuContainerStyles.push('flex-column align-items-center')
      break
    }

    case 'floating': {
      rootStyles.push(styles.sidebarFloating)
      menuContainerStyles.push('flex-row')
      break
    }

    default:
      break
  }

  const sidebarStyles = css({
    '& li .active': {
      color: `${themePrimaryColor} !important`,
      fontWeight: 600,
    },
    '& ul li': {
      fontSize: themeSidebarFontSize,
    },
    '& ul li:hover': {
      color: themePrimaryColor,
    },
  })

  return (
    <div className={rootStyles.join(' ')} css={sidebarStyles}>
      {size === 'floating' ? (
        <div className={styles.floatingAppBar}>My App</div>
      ) : null}
      <ul>
        {(function () {
          if (size === 'maximum' || size === 'floating') {
            return null
          }

          return null
        })()}
      </ul>
    </div>
  )
})

export default SidebarBase
