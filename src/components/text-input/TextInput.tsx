import React from 'react'
import styles from './TextInput.module.css'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  isValid?: boolean
  isTouched?: boolean
  errMessage?: string
}

export default function TextInput({
  label,
  isValid = true,
  isTouched = false,
  errMessage = 'Field is required',
  ...props
}: TextInputProps) {
  const inputStyles = ['mb-3', styles.textInput]

  const showErrMessage = !isValid && isTouched
  if (showErrMessage) {
    inputStyles.push(styles.textInputNotValid)
  }

  return (
    <div className={inputStyles.join(' ')}>
      <label className='form-label'>{label}</label>
      <input className='form-control' {...props} />
      {showErrMessage ? <small>{errMessage}</small> : null}
    </div>
  )
}
