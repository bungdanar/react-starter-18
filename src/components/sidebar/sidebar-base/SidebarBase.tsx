/** @jsxImportSource @emotion/react */
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../hooks/use-store'
import styles from './SidebarBase.module.css'
import { css } from '@emotion/react'
import { Fragment, useMemo } from 'react'
import { AccessAlarm, Home } from '@mui/icons-material'
import { NavLink } from 'react-router-dom'
import { Tooltip } from '@mui/material'
import SessionCountdown from '../../session-countdown/SessionCountdown'

type SidebarBaseSize = 'maximum' | 'minimum' | 'floating'

interface SidebarBaseProps {
  size: SidebarBaseSize
}

interface MenuStructure {
  id: string
  label: string
  icon: JSX.Element
  path: string
}

const SidebarBase = observer(({ size }: SidebarBaseProps) => {
  const {
    themePrimaryColor,
    themeSidebarFontSize,
    handleCloseFloatingSidebar,
  } = useStore().uiStore

  const menuStructure: MenuStructure[] = useMemo(
    () => [
      {
        id: '/',
        label: 'Home',
        icon: <Home sx={{ fontSize: 16 }} />,
        path: '/',
      },
      {
        id: '/welcome',
        label: 'Welcome',
        icon: <Home sx={{ fontSize: 16 }} />,
        path: '/welcome',
      },
    ],
    []
  )

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
            return (
              <>
                <div className={styles.userInfo}>
                  <AccessAlarm sx={{ fontSize: 16 }} />: <SessionCountdown />
                </div>
                <hr />
              </>
            )
          }

          return null
        })()}

        {menuStructure.map((m) => (
          <Fragment key={m.id}>
            <li>
              <NavLink
                to={m.path}
                onClick={() => {
                  if (size === 'floating') {
                    handleCloseFloatingSidebar()
                  }
                }}
              >
                <div className={menuContainerStyles.join(' ')}>
                  {(function () {
                    if (size === 'maximum' || size === 'floating') {
                      return (
                        <>
                          <div>{m.icon}</div>
                          <div>{m.label}</div>
                        </>
                      )
                    } else {
                      return (
                        <Tooltip title={m.label} placement='right'>
                          {m.icon}
                        </Tooltip>
                      )
                    }
                  })()}
                </div>
              </NavLink>
            </li>
            <hr />
          </Fragment>
        ))}
      </ul>
    </div>
  )
})

export default SidebarBase
