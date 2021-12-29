import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store/Context'
import css from './MenuItem.module.scss'
import { IProductDetail } from '../../interfaces'
import { toJS } from 'mobx'

interface IProps {
  product: IProductDetail
}

const MenuItem: FC<IProps> = ({ product }) => {
  const { cart, onMinusItem, onPlusItem, addToCartHandler } = useStore()

  return (
    <>
      {product && (
        <div className={css.card__container}>
          <div className={css.card__img_cotainer}>
            <img src={product.img} alt={product.name} className={css.card__img}/>
            {toJS(cart) && cart.hasOwnProperty(product.id) ? (
                <div className={css.card__inCart}>
                  <button onClick={() => onMinusItem(product.id)}>-</button>
                  <span>{cart[product.id].count}</span>
                  <button onClick={() => onPlusItem(product.id)}>+</button>
                </div>
              ) : <button className={css.card__addToCart} onClick={() => addToCartHandler(product)}>+</button>
            }
          </div>
          <div className={css.card__info_cotainer} >
            <p>{product.name}</p>
            <p><span>{product.price} ₽</span></p>
          </div>
        </div>
      )}
    </>
  )
}

export default observer(MenuItem)
