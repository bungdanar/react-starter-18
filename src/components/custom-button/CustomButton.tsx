import { observer } from 'mobx-react-lite'
import { useStore } from '../../hooks/use-store'

interface CustomButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const CustomButton = observer((props: CustomButtonProps) => {
  const { themePrimaryColor } = useStore().uiStore

  return (
    <button
      className='btn btn-sm'
      {...props}
      style={{
        color: '#fff',
        backgroundColor: themePrimaryColor,
      }}
    >
      {props.children}
    </button>
  )
})

export default CustomButton
