import React, { FC, useEffect } from 'react'
import { observer } from 'mobx-react'
import Header from './components/Header/Header'
import Navigation from './components/Navigation/Navigation'
import MenuList from './components/MenuList/MenuList'
import Footer from './components/Footer/Footer'
import './styles/common.scss'
import { useStore } from './store/Context'

const App: FC = () => {
  const store = useStore()

  useEffect(() => {
    store.getCategories()
    store.getProducts()
    store.getFooterData()
  }, [store])

  return (
    <div>
      <Header />
      <Navigation />
      <MenuList />
      <Footer />
    </div>
  )
}

export default observer(App)
