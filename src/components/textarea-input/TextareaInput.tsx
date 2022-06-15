import styles from './TextareaInput.module.css'

interface TextareaInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  isValid?: boolean
  isTouched?: boolean
  errMessage?: string
}

export default function TextareaInput({
  label,
  isValid = true,
  isTouched = false,
  errMessage = 'Field is required',
  ...props
}: TextareaInputProps) {
  const inputStyles = ['mb-3', styles.textareaInput]

  const showErrMessage = !isValid && isTouched
  if (showErrMessage) {
    inputStyles.push(styles.textareaInputNotValid)
  }

  return (
    <div className={inputStyles.join(' ')}>
      <label className='form-label'>{label}</label>
      <textarea className='form-control' {...props} />
      {showErrMessage ? <small>{errMessage}</small> : null}
    </div>
  )
}
