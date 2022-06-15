import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import CustomButton from '../../components/custom-button/CustomButton'
import CustomCard from '../../components/custom-card/CustomCard'
import CustomDivider from '../../components/custom-divider/CustomDivider'
import TextInput from '../../components/text-input/TextInput'
import { FormExampleStore } from '../../stores/locals/form-example'

const FormPage = observer(() => {
  const [
    {
      formState,
      handleChangeFormInput,
      isFormTouched,
      setFormTouched,
      isFormValid,
    },
  ] = useState(new FormExampleStore())

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setFormTouched()

    if (!isFormValid) {
      return
    }
  }

  return (
    <div className='row justify-content-center'>
      <div className='col-sm-6'>
        <CustomCard>
          <div>Form Example</div>
          <br />
          <div>
            <form onSubmit={handleSubmit}>
              <TextInput
                label='Text'
                value={formState.text.value}
                onChange={(e) => handleChangeFormInput('text', e.target.value)}
                isValid={formState.text.isValid}
                isTouched={isFormTouched}
              />
              <CustomDivider />
              <div className='d-grid gap-1'>
                <CustomButton type='submit'>Submit</CustomButton>
              </div>
            </form>
          </div>
        </CustomCard>
      </div>
    </div>
  )
})

export default FormPage
