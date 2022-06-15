export interface FormInputStruct<T> {
  value: T
  isValid: boolean
  errMessage?: string
  disabled?: boolean
}

export interface FileInputStruct<T> extends FormInputStruct<T> {
  identifier: null | number
}
