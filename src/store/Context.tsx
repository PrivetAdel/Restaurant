import React, { useContext } from 'react'
import { useLocalObservable } from 'mobx-react-lite'
import { CreateStore, TStore } from './createStore'

const Context = React.createContext<TStore | null>(null)

export const Provider = (props: { children: React.ReactNode }) => {
  const store = useLocalObservable(CreateStore)

  return <Context.Provider value={store}>
    {props.children}
  </Context.Provider>
}

export const useStore = () => {
  const store = useContext(Context)
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return store
}
