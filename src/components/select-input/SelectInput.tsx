import Select, { GroupBase, Props } from 'react-select'

type CustomProps = {
  label: string
  isValid?: boolean
  isTouched?: boolean
  errMessage?: string
}

type SelectInputProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = CustomProps & Props<Option, IsMulti, Group>

export default function SelectInput<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  label,
  isValid = true,
  isTouched = false,
  errMessage = 'Field is required',
  ...props
}: SelectInputProps<Option, IsMulti, Group>) {
  const ERR_COLOR = '#ff4136'

  const showErrMessage = !isValid && isTouched

  return (
    <div className='mb-3'>
      <div className='form-label'>{label}</div>
      <Select
        {...props}
        styles={{
          control: (provided) => ({
            ...provided,
            borderColor: showErrMessage ? ERR_COLOR : provided.borderColor,
            '&:hover': {
              borderColor: showErrMessage
                ? ERR_COLOR
                : (provided['&:hover'] as any).borderColor,
            },
            boxShadow: showErrMessage ? 'none' : provided.boxShadow,
          }),
        }}
      />
      {showErrMessage ? (
        <small style={{ color: ERR_COLOR }}>{errMessage}</small>
      ) : null}
    </div>
  )
}
