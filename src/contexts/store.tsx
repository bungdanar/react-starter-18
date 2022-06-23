import { createContext, ReactNode } from 'react'
import rootStore, { RootStore } from '../stores/root'

export const StoreContext = createContext<RootStore>(rootStore)

export const StoreProvider = ({ children }: { children?: ReactNode }) => {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  )
}
