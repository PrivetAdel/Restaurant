export interface IProductDetail {
  delivery: boolean,
  id: number,
  img: string,
  name: string,
  price: number
}

export interface IProduct {
  [id: number]: IProductDetail
}

export interface IFilters {
  [key: string]: IProductDetail
}

interface ICategory {
  id: string,
  name: string,
  products: number[]
}

interface ICart {
  [id: number]: {
    count: number,
    product: IProductDetail
  }
}

interface IAddress {
  street: string,
  house: string
}

interface IFooterData {
  title: string,
  items: Array<string>
}

export interface IInitialState {
  deliveryOption: string,
  categories: ICategory[],
  products: IProduct,
  cart: ICart,
  totalPrice: number,
  deliveryAddress: IAddress,
  footerData: Array<IFooterData>,
  showTooltip: boolean
}
