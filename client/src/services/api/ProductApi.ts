import axios, { AxiosResponse } from 'axios'
import $api, { API_URL } from '../../http'
import { ICategoryInput } from '../../pages/AdminPage/components/Categories'
import { IProductInput } from '../../pages/AdminPage/components/NewProduct'
import { IColorInput } from '../../pages/AdminPage/components/Colors'
import { ProductPageParams } from '../../pages/ProductPage/ProductPage'
import { IQueryString } from '../../store/ducks/product/product-slice'

export default class ProductApi {
  static async fetchProducts(params: IQueryString) {
    // console.log('ProductApi queryParam', params)
    console.log('API', params)

    return $api.get(`/product`, { params })
  }

  static async fetchProduct(params: ProductPageParams) {
    return $api.get(`/product/getOne/${params.url}${params.model !== undefined ? '/' + params.model : '/'}`)
  }

  static async createProduct(formData: IProductInput) {
    console.log('ERROR', formData)
    return $api.post('/product', formData, {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  static async deleteProduct(arrIds: Array<number>) {
    return $api.delete('/product', { data: arrIds })
  }

  //Models
  static async fetchModels(productId: number) {
    return $api.get(`/model/${productId}`)
  }

  //Colorways
  static async fetchColorsWays(productLink: string) {
    return $api.get(`/product/colorways/${productLink}`)
  }
  //Categories
  static async fetchCategories() {
    return $api.get('/category')
  }

  static async createCategory(formData: ICategoryInput) {
    return $api.post('/category', formData)
  }

  static async deleteCategory(arrIds: Array<number>) {
    return $api.delete('/category', { data: arrIds })
  }

  //Colors
  static async fetchColors() {
    return $api.get('/color')
  }

  static async createColor(formData: IColorInput) {
    return $api.post('/color', formData)
  }
  static async deleteColor(arrIds: Array<number>) {
    return $api.delete('/color', { data: arrIds })
  }
}
