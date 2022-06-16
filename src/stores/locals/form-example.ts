import { action, computed, makeObservable, observable, toJS } from 'mobx'
import { Moment } from 'moment'
import {
  FileInputStruct,
  FormInputStruct,
} from '../../data-types/form-input-struct'
import { FileUtility } from '../../utils/file-utility'

interface FormExampleState {
  text: FormInputStruct<string>
  textArea: FormInputStruct<string>
  select: FormInputStruct<null | { label: any; value: any }>
  date: FormInputStruct<null | Moment>
  file: FileInputStruct<undefined | null | File>
}

function initialFormExampleState(): FormExampleState {
  return {
    text: {
      value: '',
      isValid: false,
    },
    textArea: {
      value: '',
      isValid: false,
    },
    select: {
      value: null,
      isValid: false,
    },
    date: {
      value: null,
      isValid: false,
    },
    file: {
      value: undefined,
      isValid: false,
      identifier: null,
    },
  }
}

export class FormExampleStore {
  constructor() {
    makeObservable(this, {
      formState: observable,
      isFormTouched: observable,

      setFormState: action,
      setFormTouched: action,

      plainFormState: computed,
      isFormValid: computed,
    })
  }

  formState: FormExampleState = initialFormExampleState()
  isFormTouched: boolean = false

  setFormState = (value: FormExampleState) => {
    this.formState = value
  }

  setFormTouched = () => {
    if (!this.isFormTouched) {
      this.isFormTouched = true
    }
  }

  get plainFormState() {
    return toJS(this.formState)
  }

  get isFormValid(): boolean {
    let isValid = true

    for (let key in this.formState) {
      isValid = isValid && this.formState[key as keyof FormExampleState].isValid
    }

    return isValid
  }

  handleChangeFormInput = (
    formKey: keyof FormExampleState,
    value: FormExampleState[keyof FormExampleState]['value']
  ) => {
    const updatedFormState = this.plainFormState
    updatedFormState[formKey].value = value

    switch (formKey) {
      case 'text':
      case 'textArea': {
        updatedFormState[formKey].isValid =
          updatedFormState[formKey].value.trim() !== ''

        break
      }

      case 'select':
      case 'date': {
        updatedFormState[formKey].isValid =
          updatedFormState[formKey].value !== null

        break
      }

      default:
        break
    }

    this.setFormState(updatedFormState)
  }

  handleChangeFileFormInput = (fileList: FileList | null) => {
    let file: undefined | null | File = undefined

    if (fileList) {
      file = fileList[0]
    }

    const updatedFormState = this.plainFormState
    updatedFormState.file.value = file

    const { isValid, errMsg, identifier } =
      FileUtility.checkFileInputValidity(file)
    updatedFormState.file.isValid = isValid
    updatedFormState.file.errMessage = errMsg
    updatedFormState.file.identifier = identifier

    this.setFormState(updatedFormState)
  }

  handleResetFileFormInput = () => {
    const updatedFormState = this.plainFormState
    updatedFormState.file.value = undefined

    const { isValid, errMsg, identifier } =
      FileUtility.checkFileInputValidity(undefined)

    updatedFormState.file.isValid = isValid
    updatedFormState.file.errMessage = errMsg
    updatedFormState.file.identifier = identifier

    this.setFormState(updatedFormState)
  }
}
