import { observer } from 'mobx-react-lite'
import { Bars } from 'react-loader-spinner'
import { useStore } from '../../hooks/use-store'

interface CustomLoaderProps {
  size?: number
  color?: string
}

const CustomLoader = observer(
  ({ size = 22, color }: CustomLoaderProps): JSX.Element => {
    const { themePrimaryColor } = useStore().uiStore

    return (
      <Bars
        color={color !== undefined ? color : themePrimaryColor}
        height={size}
        width={size}
      />
    )
  }
)

export default CustomLoader
