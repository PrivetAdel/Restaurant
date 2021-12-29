import { action, computed, makeObservable, observable, runInAction, toJS } from 'mobx'
import { useLocalObservable } from 'mobx-react'
import { IProductDetail, IInitialState, IFilters } from '../interfaces'

export function CreateStore () {
  const initialState: IInitialState = useLocalObservable(() => ({
    deliveryOption: 'pickup',
    categories: [],
    products: {},
    cart: {},
    totalPrice: 0,
    deliveryAddress: { street: '', house: '' },
    footerData: [],
    showTooltip: false
  }))

  return makeObservable({
    deliveryOption: initialState.deliveryOption,
    categories: initialState.categories,
    products: initialState.products,
    cart: initialState.cart,
    deliveryAddress: initialState.deliveryAddress,
    footerData: initialState.footerData,
    
    checkedDeliveryHandler(e: React.ChangeEvent<HTMLInputElement>) {
      this.deliveryOption = e.target.id

      e.target.id === 'delivery' ? this.getDeliveryProducts() : this.getProducts()
    },

    addToCartHandler(product: IProductDetail) {
      Object.assign(this.cart, {[product.id]: {product, count: 1 }})
    },

    onMinusItem(id: number) {
      if (this.cart[id].count > 1) {
        this.cart[id].count -= 1
      } else {
        delete this.cart[id]
      }
    },

    onPlusItem(id: number) {
      this.cart[id].count += 1
    },
    
    getCategories() {
      fetch('/categories')
        .then(res => res.json())
        .then(categories => {
          runInAction(() => {
            categories.map((category: any) => this.categories.push(category))
          })
        })
        .catch(error => console.error('Error', error))
    },

    getProducts() {
      fetch('/products')
        .then(res => res.json())
        .then(newProducts => {
          runInAction(() => {
            if ( Object.entries(this.products).length) {
              return this.products = newProducts
            }
            Object.assign(this.products, newProducts)
          })
        })
        .catch(error => console.error('Error', error))
    },

    getDeliveryProducts() {
      Object.entries(this.products).reduce((newObj: IFilters, product) => {
        if (product[1].delivery === true) {
          newObj[product[0]] = product[1]
        }
        return this.products = newObj
      }, {})
    },

    setDeliveryAddress(address: object) {
      runInAction(() => {
        Object.assign(this.deliveryAddress, address)
      })
    },

    getFooterData() {
      fetch('/footerData')
        .then(res => res.json())
        .then(dataItems => {
          runInAction(() => {
            dataItems.map((item: any) => this.footerData.push(item))
          })
        })
        .catch(error => console.error('Error', error))
    },

    submitOrder() {
      if (this.totalPrice !== 0) {
        if (this.deliveryOption === 'delivery' &&
          (!this.deliveryAddress.street || !this.deliveryAddress.house)) {
          return
        }

        console.log('Заказ', toJS(this.cart))
        this.cart = {}
        this.setDeliveryAddress({street: '', house: ''})
      }
    },

    get showTooltip() {
      if (!this.deliveryAddress.street || !this.deliveryAddress.house) {
        return true
      }
      return false
    },

    get totalPrice() {
      return Object.values(this.cart).reduce((sum: any, obj: any) => {
        return sum + (obj.count * obj.product.price)
      }, 0)
    }
  },
  
  {
    deliveryOption: observable,
    categories: observable,
    cart: observable,
    products: observable,
    deliveryAddress: observable,
    footerData: observable,
    totalPrice: computed,
    showTooltip: computed,
    getCategories: action.bound,
    getProducts: action.bound,
    getDeliveryProducts: action.bound,
    getFooterData: action.bound,
    checkedDeliveryHandler: action.bound,
    addToCartHandler: action.bound,
    onMinusItem: action.bound,
    onPlusItem: action.bound,
    submitOrder: action.bound,
    setDeliveryAddress: action.bound
  })
}

export type TStore = ReturnType<typeof CreateStore>
