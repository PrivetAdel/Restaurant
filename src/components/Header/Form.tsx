import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store/Context'
import css from './Form.module.scss'

const Form: FC = () => {
  const { setDeliveryAddress, deliveryAddress, showTooltip } = useStore()

  const changeAddressHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryAddress({...deliveryAddress, [evt.target.id]: evt.target.value})
  }
  
  return (
    <form className={css.delivery__form}>
      <div>
        <div>
          <label htmlFor='street'>Улица</label>
          <input 
            required
            id='street'
            type='text'
            placeholder='Остоженка'
            value={deliveryAddress.street}
            onChange={changeAddressHandler}  />
        </div>
        
        <div>
          <label htmlFor='house'>Дом</label>
          <input 
            required
            id='house'
            type='text'
            placeholder='10'
            value={deliveryAddress.house}
            onChange={changeAddressHandler} />
        </div>
      </div>

      {showTooltip && (
        <div className={css.delivery__tooltip_container}>
          <p className={css.delivery__form_tooltip}>Нужно заполнить для оформления доставки</p>
        </div>
      )}
    </form>
  )
}

export default observer(Form)
