import { observer } from 'mobx-react-lite'
import { useRef, useState } from 'react'
import CustomButton from '../../components/custom-button/CustomButton'
import CustomCard from '../../components/custom-card/CustomCard'
import CustomDivider from '../../components/custom-divider/CustomDivider'
import DateInput from '../../components/date-input/DateInput'
import FileInput from '../../components/file-input/FileInput'
import SelectInput from '../../components/select-input/SelectInput'
import TextInput from '../../components/text-input/TextInput'
import TextareaInput from '../../components/textarea-input/TextareaInput'
import TimeInput from '../../components/time-input/TimeInput'
import { FormExampleStore } from '../../stores/locals/form-example'

const FormPage = observer(() => {
  const [
    {
      formState,
      handleChangeFormInput,
      isFormTouched,
      setFormTouched,
      isFormValid,
      handleChangeFileFormInput,
      handleResetFileFormInput,
    },
  ] = useState(new FormExampleStore())

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleResetFile = () => {
    handleResetFileFormInput()
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

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
              <TextareaInput
                label='Textarea'
                value={formState.textArea.value}
                onChange={(e) =>
                  handleChangeFormInput('textArea', e.target.value)
                }
                isValid={formState.textArea.isValid}
                isTouched={isFormTouched}
              />
              <CustomDivider />
              <SelectInput
                label='Select'
                value={formState.select.value}
                options={[1, 2, 3].map((e) => ({
                  label: `Option ${e}`,
                  value: e,
                }))}
                onChange={(e) => handleChangeFormInput('select', e)}
                isValid={formState.select.isValid}
                isTouched={isFormTouched}
              />
              <CustomDivider />
              <DateInput
                label='Date'
                value={formState.date.value}
                onChange={(e) => handleChangeFormInput('date', e)}
                isValid={formState.date.isValid}
                isTouched={isFormTouched}
              />
              <CustomDivider />
              <TimeInput
                label='Time'
                value={formState.time.value}
                onChange={(e) => handleChangeFormInput('time', e)}
                isValid={formState.time.isValid}
                isTouched={isFormTouched}
              />
              <CustomDivider />
              <FileInput
                label='File'
                onChange={(e) => {
                  handleChangeFileFormInput(e.target.files)
                }}
                isValid={formState.file.isValid}
                errMessage={formState.file.errMessage}
                isTouched={isFormTouched}
                ref={fileInputRef}
                handleReset={handleResetFile}
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
