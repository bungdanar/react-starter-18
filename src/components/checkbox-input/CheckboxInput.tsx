import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material'

interface CheckboxInputProps extends CheckboxProps {
  label: string
}

export default function CheckboxInput({ label, ...props }: CheckboxInputProps) {
  return <FormControlLabel label={label} control={<Checkbox {...props} />} />
}
