import { DeleteForever } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { forwardRef } from 'react'

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean
  isTouched?: boolean
  errMessage?: string
  handleReset?: () => void
  showResetBtn?: boolean
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      isValid = true,
      isTouched = false,
      errMessage = 'Field is required',
      handleReset = () => {},
      showResetBtn = true,
      ...props
    }: FileInputProps,
    ref
  ) => {
    const showErrMessage = !isValid && isTouched
    const inputDivStyle = showResetBtn ? 'col-sm-11' : 'col-sm-12'

    return (
      <>
        <div className='row'>
          <div className={inputDivStyle}>
            <input
              className='form-control mb-1'
              type='file'
              ref={ref}
              {...props}
            />
          </div>
          {showResetBtn ? (
            <div className='col-sm-1'>
              <Tooltip title='reset file' placement='top'>
                <IconButton onClick={handleReset}>
                  <DeleteForever />
                </IconButton>
              </Tooltip>
            </div>
          ) : null}
        </div>
        {showErrMessage ? (
          <small style={{ color: '#ff4136' }}>{errMessage}</small>
        ) : null}
      </>
    )
  }
)

export default FileInput
