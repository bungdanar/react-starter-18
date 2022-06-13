import { Link } from 'react-router-dom'
import CustomCard from '../../components/custom-card/CustomCard'

export default function Product() {
  return (
    <div className='row justify-content-center'>
      <div className='col-sm-6'>
        <CustomCard>
          <div>Products</div>
          <ul>
            {Array.from([1, 2, 3, 4, 5]).map((p) => (
              <li key={p}>
                <Link to={`/products/${p}`}>{`Product ${p}`}</Link>
              </li>
            ))}
          </ul>
        </CustomCard>
      </div>
    </div>
  )
}
