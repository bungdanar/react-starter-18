import Swal from 'sweetalert2'
import rootStore from '../stores/root'
import { generateErrMessage } from './handle-error'

interface AsyncSubmitWrapperParams<T> {
  provideConfirmation: boolean
  provideSuccess: boolean
  confirmTitleMsg?: string
  confirmTextMsg?: string
  loadingMsg?: string
  successTitleMsg?: string
  successTextMsg?: string
  submitHandler: () => Promise<T>
  afterSubmit?: (params?: T) => any
}

export class CustomSwal {
  private static base = Swal.mixin({
    allowEscapeKey: false,
    allowOutsideClick: false,
  })

  private static get themePrimaryColor(): string {
    return rootStore.uiStore.themePrimaryColor
  }

  static success = (title: string = 'Success', text: string = '') =>
    this.base.fire({
      icon: 'success',
      title,
      text,
      confirmButtonColor: this.themePrimaryColor,
      iconColor: this.themePrimaryColor,
    })

  static error = (title: string = 'Error', text: string = '') =>
    this.base.fire({
      icon: 'error',
      title,
      text,
      confirmButtonColor: this.themePrimaryColor,
    })

  static confirm = (
    title: string = 'Question?',
    text: string = '',
    confirmButtonText: string = 'Ok'
  ) =>
    this.base.fire({
      icon: 'question',
      title,
      text,
      showCancelButton: true,
      confirmButtonText,
      confirmButtonColor: this.themePrimaryColor,
      iconColor: this.themePrimaryColor,
    })

  static loading = (loadingText: string = 'Loading...') =>
    this.base.fire({
      html: loadingText,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading()
      },
    })

  // IF YOU WANT TO PROGRAMMATICALLY CLOSE SWAL INSTANCE
  // DO NOT AWAIT THOSE SWAL INSTANCE
  static handleClose = () => {
    Swal.close()
  }

  static asyncSubmitWrapper = async <T>({
    provideConfirmation,
    provideSuccess,
    confirmTitleMsg = 'Perhatian!',
    confirmTextMsg,
    loadingMsg,
    successTitleMsg,
    successTextMsg,
    submitHandler,
    afterSubmit,
  }: AsyncSubmitWrapperParams<T>) => {
    const execution = async () => {
      this.loading(loadingMsg)

      try {
        const data = await submitHandler()

        this.handleClose()

        if (provideSuccess) {
          await this.success(successTitleMsg, successTextMsg)
        }

        if (afterSubmit) {
          afterSubmit(data)
        }
      } catch (error) {
        this.handleClose()
        await this.error(generateErrMessage(error))
      }
    }

    if (provideConfirmation) {
      const confirmResult = await this.confirm(confirmTitleMsg, confirmTextMsg)

      if (confirmResult.value) {
        execution()
      }
    } else {
      execution()
    }
  }
}
