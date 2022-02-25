import { CaseReducer, createAction, createSlice } from '@reduxjs/toolkit'

export interface ICartItemPayload {
  sizeId: number
  productModelId: number
}

export interface ICartCounterPayload {
  quantity: number
  productModelId: number
  sizeId: number
}

export const fetchCartItems = createAction('cart/fetchCartItems')
export const fetchDeleteCartItem = createAction<ICartItemPayload>('cart/fetchDeleteCartItem')
export const addToCart = createAction<ICartItemPayload>('cart/addToCart')
export const changeCount = createAction<ICartCounterPayload>('cart/changeCount')

const initialState: any = {
  cartItems: [],
  isPending: false,
  totalPrice: 0,
  totalCartCount: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItem: (state, { payload }) => {
      state.cartItems.push(payload)
      state.isPending = false
    },

    setCartItems: (state, action) => {
      state.cartItems = action.payload
      state.isPending = false
    },
    setCartPending: (state, action) => {
      state.isPending = action.payload
    },
    deleteCartItem: (state, { payload }) => {
      console.log('Cart items', state.cartItems)
      state.cartItems = state.cartItems.filter(
        (item: any) => payload !== item.product_model.id && item.sizeId !== payload.sizeId
      )
      state.isPending = false
    },
    resetCartItems: () => {},
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload
    },
    setTotalCartCount: (state, action) => {
      state.totalCartCount = action.payload
    },
  },
})

export const {
  setCartItems,
  setCartItem,
  setCartPending,
  deleteCartItem,
  resetCartItems,
  setTotalPrice,
  setTotalCartCount,
} = cartSlice.actions
export default cartSlice.reducer
