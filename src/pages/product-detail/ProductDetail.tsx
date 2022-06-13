import { useParams } from 'react-router-dom'
import CustomCard from '../../components/custom-card/CustomCard'

export default function ProductDetail() {
  const params = useParams<{ productId: string }>()

  return (
    <div className='row justify-content-center'>
      <div className='col-sm-6'>
        <CustomCard>{`Detail for Product no. ${params.productId}`}</CustomCard>
      </div>
    </div>
  )
}
