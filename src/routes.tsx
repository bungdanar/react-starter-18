import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Fallback from './components/fallback/Fallback'
import NotFound from './components/not-found/NotFound'

const Home = lazy(() => import('./pages/home/Home'))
const Dummy = lazy(() => import('./pages/dummy/Dummy'))
const Product = lazy(() => import('./pages/product/Product'))
const ProductDetail = lazy(() => import('./pages/product-detail/ProductDetail'))

const AppRoutes = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/welcome' element={<Dummy content='Welcome' />} />
        <Route path='/products' element={<Product />} />
        <Route path='/products/:productId' element={<ProductDetail />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export { AppRoutes }
