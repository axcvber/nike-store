import axios, { AxiosResponse } from 'axios'
import { ILoginInputs } from '../../components/Forms/LoginForm'
import { IRegisterInputs } from '../../components/Forms/RegisterForm'
import $api, { API_URL } from '../../http'

export interface IUser {
  id: string
  email: string
  firstName: string
  lastName: string
  dateOfBirth: any
  country: string
  gender: string
  role: string
  isActivated: boolean
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: IUser
}

export default class AuthApi {
  static async login(formData: ILoginInputs): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/user/login', formData)
  }

  static async registration(formData: IRegisterInputs): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/user/registration', formData)
  }

  static async logout(): Promise<void> {
    return $api.post('/user/logout')
  }

  static async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return axios.get<AuthResponse>(`${API_URL}/user/refresh`, { withCredentials: true })
  }
}
