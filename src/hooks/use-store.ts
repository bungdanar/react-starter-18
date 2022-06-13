import { useContext } from 'react'
import { StoreContext } from '../contexts/store'

export const useStore = () => useContext(StoreContext)
