import { FormControlLabel, Radio, RadioGroup } from '@mui/material'

interface RadioInputProps {
  label: string
  value: any
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  options: {
    label: string
    value: any
  }[]
}

export default function RadioInput({
  label,
  value,
  onChange,
  options,
}: RadioInputProps) {
  return (
    <div className='mb-3'>
      <label className='form-label'>{label}</label>
      <RadioGroup row value={value} onChange={onChange}>
        {options.map((o, i) => (
          <FormControlLabel
            key={i}
            label={o.label}
            value={o.value}
            control={<Radio />}
          />
        ))}
      </RadioGroup>
    </div>
  )
}
