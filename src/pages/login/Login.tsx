import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import CustomButton from '../../components/custom-button/CustomButton'
import CustomCard from '../../components/custom-card/CustomCard'
import CustomDivider from '../../components/custom-divider/CustomDivider'
import TextInput from '../../components/text-input/TextInput'
import { useStore } from '../../hooks/use-store'
import { LoginFormStore } from '../../stores/locals/login-form'
import { CustomSwal } from '../../utils/custom-swal'

const LoginPage = observer(() => {
  const [
    {
      plainFormState,
      isFormTouched,
      isFormValid,
      handleChangeFormInput,
      setFormTouched,
    },
  ] = useState<LoginFormStore>(new LoginFormStore())

  const { userStore } = useStore()

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormTouched()

    if (!isFormValid) {
      return
    }

    CustomSwal.asyncSubmitWrapper({
      provideConfirmation: false,
      provideSuccess: false,
      loadingMsg: 'Logging in...',
      submitHandler: async () => {
        await userStore.login({
          username: plainFormState.username.value,
          password: plainFormState.password.value,
        })
      },
    })
  }

  return (
    <div className='row justify-content-center'>
      <div className='col-sm-4'>
        <CustomCard>
          <div className='mb-3 d-flex justify-content-center'>
            <h4>My App</h4>
          </div>
          <form onSubmit={handleSubmitForm}>
            <TextInput
              label='Username'
              type='text'
              value={plainFormState.username.value}
              isValid={plainFormState.username.isValid}
              isTouched={isFormTouched}
              onChange={(e) =>
                handleChangeFormInput('username', e.target.value)
              }
            />
            <CustomDivider />
            <TextInput
              label='Password'
              type='password'
              value={plainFormState.password.value}
              isValid={plainFormState.password.isValid}
              isTouched={isFormTouched}
              onChange={(e) =>
                handleChangeFormInput('password', e.target.value)
              }
            />
            <CustomDivider />
            <div className='d-grid gap-1'>
              <CustomButton type='submit'>Login</CustomButton>
            </div>
          </form>
        </CustomCard>
      </div>
    </div>
  )
})

export default LoginPage
