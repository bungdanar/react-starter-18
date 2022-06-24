import { action, computed, makeObservable, observable, toJS } from 'mobx'
import { FormInputStruct } from '../../data-types/form-input-struct'

interface LoginFormState {
  username: FormInputStruct<string>
  password: FormInputStruct<string>
}

function initialLoginFormState(): LoginFormState {
  return {
    username: {
      value: '',
      isValid: false,
    },
    password: {
      value: '',
      isValid: false,
    },
  }
}

export class LoginFormStore {
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

  formState: LoginFormState = initialLoginFormState()
  isFormTouched: boolean = false

  setFormState = (value: LoginFormState) => {
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
      isValid = isValid && this.formState[key as keyof LoginFormState].isValid
    }

    return isValid
  }

  handleChangeFormInput = (
    formKey: keyof LoginFormState,
    value: LoginFormState[keyof LoginFormState]['value']
  ) => {
    const updatedFormState = this.plainFormState
    updatedFormState[formKey].value = value

    switch (formKey) {
      case 'username':
      case 'password': {
        updatedFormState[formKey].isValid =
          updatedFormState[formKey].value.trim() !== ''

        break
      }

      default:
        break
    }

    this.setFormState(updatedFormState)
  }
}
