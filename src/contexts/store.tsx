import { createContext, ReactNode } from 'react'
import { RootStore } from '../stores/root'

const rootStore = new RootStore()

export const StoreContext = createContext<RootStore>(rootStore)

export const StoreProvider = ({ children }: { children?: ReactNode }) => {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  )
}
