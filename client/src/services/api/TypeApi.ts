import axios, { AxiosResponse } from 'axios'
import $api, { API_URL } from '../../http'
import { ITypesInput } from '../../pages/AdminPage/components/Types'

export default class TypeApi {
  static async fetchTypes() {
    return $api.get('/type')
  }
  static async createType(formData: ITypesInput) {
    console.log('TYPEAPI', formData)
    return $api.post('/type', formData)
  }

  static async deleteTypes(arrIds: Array<number>) {
    return $api.delete('/type', { data: arrIds })
  }
}
