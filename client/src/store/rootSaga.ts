import { all } from 'redux-saga/effects'
import { authSaga } from './ducks/auth/auth-saga'
import { cartSaga } from './ducks/cart/cart-saga'
import { productSaga } from './ducks/product/product-saga'
import { typesSaga } from './ducks/types/types-saga'

export default function* rootSaga() {
  yield all([authSaga(), productSaga(), typesSaga(), cartSaga()])
}
