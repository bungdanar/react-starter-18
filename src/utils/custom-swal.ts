import Swal from 'sweetalert2'
import rootStore from '../stores/root'

const getThemePrimaryColor = () => rootStore.uiStore.themePrimaryColor

const baseSwal = Swal.mixin({
  allowEscapeKey: false,
  allowOutsideClick: false,
})

const successSwal = (title: string = 'Success', text: string = '') =>
  baseSwal.fire({
    icon: 'success',
    title,
    text,
    confirmButtonColor: getThemePrimaryColor(),
    iconColor: getThemePrimaryColor(),
  })

const errorSwal = (title: string = 'Error', text: string = '') =>
  baseSwal.fire({
    icon: 'error',
    title,
    text,
    confirmButtonColor: getThemePrimaryColor(),
  })

const confirmSwal = (
  title: string = 'Question?',
  text: string = '',
  confirmButtonText: string = 'Ok'
) =>
  baseSwal.fire({
    icon: 'question',
    title,
    text,
    showCancelButton: true,
    confirmButtonText,
    confirmButtonColor: getThemePrimaryColor(),
    iconColor: getThemePrimaryColor(),
  })

const loadingSwal = (loadingText: string = 'Loading...') =>
  baseSwal.fire({
    html: loadingText,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading()
    },
  })

// IF YOU WANT TO PROGRAMMATICALLY CLOSE SWAL INSTANCE
// DO NOT AWAIT THOSE SWAL INSTANCE
const handleCloseSwal = () => {
  Swal.close()
}

export {
  baseSwal,
  successSwal,
  errorSwal,
  confirmSwal,
  loadingSwal,
  handleCloseSwal,
}
