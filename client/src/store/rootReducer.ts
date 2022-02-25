import { combineReducers } from '@reduxjs/toolkit'
import authSlice from './ducks/auth/auth-reducer'
import cartSlice from './ducks/cart/cart-slice'
import modalSlice from './ducks/modals/modal-reducer'
import productSlice from './ducks/product/product-slice'
import typesSlice from './ducks/types/types-slice'

export const rootReducer = combineReducers({
  auth: authSlice,
  modals: modalSlice,
  product: productSlice,
  types: typesSlice,
  cart: cartSlice,
})

export type RootState = ReturnType<typeof rootReducer>
