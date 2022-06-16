import { Moment } from 'moment'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import styles from './TimeInput.module.css'

interface TimeInputProps {
  label: string
  value: Moment | null
  onChange: (time: Moment | null) => void
  isValid?: boolean
  isTouched?: boolean
  errMessage?: string
}

export default function TimeInput({
  label,
  value,
  onChange,
  isValid = true,
  isTouched = false,
  errMessage = 'Field is required',
}: TimeInputProps) {
  const inputStyles = ['mb-3', styles.timeInput]

  const showErrMessage = !isValid && isTouched
  if (showErrMessage) {
    inputStyles.push(styles.timeInputNotValid)
  }

  return (
    <div className={inputStyles.join(' ')}>
      <label className='form-label'>{label}</label>
      <TimePicker
        value={value}
        onChange={onChange}
        renderInput={({ inputRef, inputProps, InputProps }) => (
          <div className='d-flex flex-row align-items-center'>
            <input ref={inputRef} {...inputProps} className='form-control' />
            {InputProps?.endAdornment}
          </div>
        )}
      />
      {showErrMessage ? <small>{errMessage}</small> : null}
    </div>
  )
}
