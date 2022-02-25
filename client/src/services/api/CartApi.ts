import axios, { AxiosResponse } from 'axios'

import $api, { API_URL } from '../../http'
import { ICartCounterPayload, ICartItemPayload } from '../../store/ducks/cart/cart-slice'

export default class CartApi {
  static async fetchCartItems() {
    return $api.get('/basket')
  }
  static async addToCart(payload: ICartItemPayload) {
    return $api.post(`/basket/add/`, payload)
  }
  static async changeCartCount(payload: ICartCounterPayload) {
    return $api.post(`/basket/newCount`, payload)
  }
  static async deleteCartItem(payload: ICartItemPayload) {
    return $api.delete(`/basket`, { data: payload })
  }
}
