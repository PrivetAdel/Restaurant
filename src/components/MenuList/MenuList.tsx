import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { Element } from 'react-scroll'
import { useStore } from '../../store/Context'
import MenuItem from '../MenuItem/MenuItem'
import css from './MenuList.module.scss'

const MenuList: FC = () => {
  const { categories, products } = useStore()
  return (
    <section className={css.menu__container}>
      {categories && categories.map(category => (
        <Element className={css.category} name={category.name} key={category.id}>
          <h2>{category.name}</h2>
          <div className={css.category__list}>
            {category.products.map(item => <MenuItem key={item} product={products[item]}/>)}
          </div>
        </Element>
        ))
      }
    </section>
  )
}

export default observer(MenuList)
