import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Moment } from 'moment'
import styles from './DateInput.module.css'

interface DateInputProps {
  label: string
  value: Moment | null
  onChange: (date: Moment | null) => void
  isValid?: boolean
  isTouched?: boolean
  errMessage?: string
}

export default function DateInput({
  label,
  value,
  onChange,
  isValid = true,
  isTouched = false,
  errMessage = 'Field is required',
}: DateInputProps) {
  const inputStyles = ['mb-3', styles.dateInput]

  const showErrMessage = !isValid && isTouched
  if (showErrMessage) {
    inputStyles.push(styles.dateInputNotValid)
  }

  return (
    <div className={inputStyles.join(' ')}>
      <label className='form-label'>{label}</label>
      <DatePicker
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
