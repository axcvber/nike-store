import { AxiosResponse } from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import { ILoginInputs } from '../../../components/Forms/LoginForm'
import { IRegisterInputs } from '../../../components/Forms/RegisterForm'
import AuthApi, { AuthResponse } from '../../../services/api/AuthApi'
import CartApi from '../../../services/api/CartApi'
import {
  addToCart,
  changeCount,
  deleteCartItem,
  fetchCartItems,
  fetchDeleteCartItem,
  ICartCounterPayload,
  ICartItemPayload,
  setCartItem,
  setCartItems,
  setCartPending,
  setTotalCartCount,
  setTotalPrice,
} from './cart-slice'

interface IActionWorker<P> {
  type: string
  payload: P
}

export function* fetchCartItemsWorker() {
  try {
    yield put(setCartPending(true))
    const { data }: AxiosResponse<any> = yield call(CartApi.fetchCartItems)
    yield put(setCartItems(data.basketItems))
    yield put(setTotalPrice(data.totalPrice))
    yield put(setTotalCartCount(data.totalCount))
  } catch (e) {
    console.log(e)
  }
}

export function* addToCartWorker({ payload }: IActionWorker<ICartItemPayload>) {
  try {
    yield put(setCartPending(true))
    const { data }: AxiosResponse<any> = yield call(CartApi.addToCart, payload)
    yield put(setCartItems(data.cartItems))
    yield put(setTotalCartCount(data.totalCount))
    // localStorage.setItem('modelId', data.accessToken)
  } catch (e) {
    yield put(setCartPending(false))
    console.log(e)
  }
}

export function* changeCountWorker({ payload }: IActionWorker<ICartCounterPayload>) {
  try {
    yield put(setCartPending(true))
    const { data }: AxiosResponse<any> = yield call(CartApi.changeCartCount, payload)
    yield put(setCartItems(data.cartItems))
    yield put(setTotalPrice(data.totalPrice))
    yield put(setTotalCartCount(data.totalCount))
    // if (data) {
    //   console.log('Cart Item was deleted', data)
    //   yield put(deleteCartItem(payload))
    //   yield put(setTotalPrice(data.totalPrice))
    //   yield put(setTotalCartCount(data.totalCount))
    // }
  } catch (e) {
    console.log(e)
  }
}

export function* deleteCartItemWorker({ payload }: IActionWorker<ICartItemPayload>) {
  try {
    yield put(setCartPending(true))
    const { data }: AxiosResponse<any> = yield call(CartApi.deleteCartItem, payload)
    console.log('Cart Item was deleted', data)
    yield put(deleteCartItem(payload))
    yield put(setTotalPrice(data.totalPrice))
    yield put(setTotalCartCount(data.totalCount))
  } catch (e) {
    console.log(e)
  }
}

export function* cartSaga() {
  yield takeEvery(fetchCartItems.type, fetchCartItemsWorker)
  yield takeEvery(fetchDeleteCartItem.type, deleteCartItemWorker)
  yield takeEvery(addToCart.type, addToCartWorker)
  yield takeEvery(changeCount.type, changeCountWorker)
}
