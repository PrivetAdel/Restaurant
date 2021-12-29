import React, { FC, useRef, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-scroll'
import cn from 'classnames'
import { useStore } from '../../store/Context'
import css from './Navigation.module.scss'

const Navigation: FC = () => {
  const { categories } = useStore()
  const [fixed, setFixed] = useState(false)
  const refNavigation = useRef<HTMLElement>(null)
  const nav = refNavigation.current
  
  useEffect(() => {
    const fixed = Number(nav?.offsetTop)

    window.addEventListener(`scroll`, () => {
      window.pageYOffset > fixed ? setFixed(true) : setFixed(false)
    })
  }, [nav])

  return (
    <nav ref={refNavigation} className={cn(css.nav, fixed && css.fixed)} >
      <ul className={css.categories} >
        {categories && categories.map(category => (
          <li key={category.id} className={css.categories__item} >
            <Link 
              activeClass={css.active}
              to={category.name} 
              spy={true} 
              offset={-10}
              smooth={true} >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default observer(Navigation)
