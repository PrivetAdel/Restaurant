import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'
import css from './Header.module.scss'
import { useStore } from '../../store/Context'
import Form from './Form'

const Header: FC = () => {
  const { totalPrice, deliveryOption, checkedDeliveryHandler, submitOrder } = useStore()

  return (
    <header className={css.header}>
      <div className={css.header__cart}>
        <button className={css.cart__button} onClick={submitOrder}>
          <span>{totalPrice} ₽</span>
        </button>
      </div>
      
      <div className={css.delivery__container}>
        <div>
          {deliveryOption === 'pickup' ? <h1>Самовывоз г.&nbsp;Москва</h1> : <h1>Доставка г.&nbsp;Москва</h1>}
        </div>

        <div className={css.delivery__option}>
          <input 
            type='radio' 
            name='delivery'
            value='delivery'
            id='delivery'
            checked={deliveryOption === 'delivery'}
            className={css.delivery}
            onChange={checkedDeliveryHandler} />
          <label htmlFor='delivery'>Доставка</label>

          <input 
            type='radio' 
            name='delivery'
            value='pickup'
            id='pickup'
            checked={deliveryOption === 'pickup'}
            onChange={checkedDeliveryHandler} />
          <label htmlFor='pickup'>Самовывоз</label>
        </div>
      </div>

      <div>
        {deliveryOption === 'pickup' ?
          <div><h2>Наш адрес: г.&nbsp;Москва, ул.&nbsp;Тверская, д.&nbsp;10</h2></div>
          : <Form />
        }
      </div>
    </header>
  )
}

export default observer(Header)
