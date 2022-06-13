import { Link } from 'react-router-dom'
import CustomButton from '../../components/custom-button/CustomButton'
import CustomCard from '../../components/custom-card/CustomCard'

export default function Home() {
  return (
    <div className='row justify-content-center'>
      <div className='col-sm-6'>
        <CustomCard>
          <div>Home</div>
          <div>
            <ul>
              <li>
                <Link to={'/welcome'}>Welcome</Link>
              </li>
              <li>
                <Link to={'/products'}>Products</Link>
              </li>
            </ul>
          </div>
          <div>
            <CustomButton>Theme Btn</CustomButton>
          </div>
        </CustomCard>
      </div>
    </div>
  )
}
