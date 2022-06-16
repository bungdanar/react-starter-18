import { Link } from 'react-router-dom'
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
              <li>
                <Link to={'/mui'}>MUI</Link>
              </li>
              <li>
                <Link to={'/client-table'}>Client Side Table</Link>
              </li>
              <li>
                <Link to={'/server-table'}>Server Side Table</Link>
              </li>
              <li>
                <Link to={'/form'}>Form</Link>
              </li>
            </ul>
          </div>
        </CustomCard>
      </div>
    </div>
  )
}
