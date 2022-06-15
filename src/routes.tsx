import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Fallback from './components/fallback/Fallback'
import NotFound from './components/not-found/NotFound'

const Home = lazy(() => import('./pages/home/Home'))
const Dummy = lazy(() => import('./pages/dummy/Dummy'))
const Product = lazy(() => import('./pages/product/Product'))
const ProductDetail = lazy(() => import('./pages/product-detail/ProductDetail'))
const Mui = lazy(() => import('./pages/mui/Mui'))
const ClientSideTablePage = lazy(
  () => import('./pages/table/ClientSideTablePage')
)
const ServerSideTablePage = lazy(
  () => import('./pages/table/ServerSideTablePage')
)
const FormPage = lazy(() => import('./pages/form/Form'))

const AppRoutes = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/welcome' element={<Dummy content='Welcome' />} />
        <Route path='/products' element={<Product />} />
        <Route path='/products/:productId' element={<ProductDetail />} />
        <Route path='/mui' element={<Mui />} />
        <Route path='/client-table' element={<ClientSideTablePage />} />
        <Route path='/server-table' element={<ServerSideTablePage />} />
        <Route path='/form' element={<FormPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export { AppRoutes }
