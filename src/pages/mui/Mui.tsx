import { Button } from '@mui/material'
import { useState } from 'react'
import CustomCard from '../../components/custom-card/CustomCard'
import CustomDialog from '../../components/custom-dialog/CustomDialog'

export default function Mui() {
  const [open, setOpen] = useState(false)

  const handleOpenDialog = () => {
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  return (
    <>
      <div className='row justify-content-center'>
        <div className='col-sm-6'>
          <CustomCard>
            <div>
              <Button variant='contained' onClick={handleOpenDialog}>
                Open dialog
              </Button>
            </div>
          </CustomCard>
        </div>
      </div>
      <CustomDialog open={open} title='Dialog' handleClose={handleCloseDialog}>
        Dialog
      </CustomDialog>
    </>
  )
}
