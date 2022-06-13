import {
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { ReactNode } from 'react'

interface CustomDialogPros extends DialogProps {
  handleClose: () => void
  title: string
  children?: ReactNode
}

export default function CustomDialog({
  title,
  handleClose,
  children,
  maxWidth = 'sm',
  open,
  ...props
}: CustomDialogPros) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      fullWidth={true}
      fullScreen={fullScreen}
      scroll='paper'
      maxWidth={maxWidth}
      open={open}
      {...props}
    >
      <DialogTitle>
        <div className='d-flex flex-row justify-content-between'>
          <div style={{ color: '#676a6c' }}>{title}</div>
          <div onClick={handleClose} style={{ cursor: 'pointer' }}>
            x
          </div>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  )
}
