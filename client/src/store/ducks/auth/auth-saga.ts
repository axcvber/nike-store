import { AxiosResponse } from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import { ILoginInputs } from '../../../components/Forms/LoginForm'
import { IRegisterInputs } from '../../../components/Forms/RegisterForm'
import AuthApi, { AuthResponse } from '../../../services/api/AuthApi'
import {
  fetchLogin,
  setIsLoading,
  setAuthSuccess,
  fetchLogout,
  fetchSignUp,
  setUserData,
  setIsAuth,
  checkAuth,
  setSignInFail,
  setSignInValidationError,
  setSignUpValidationError,
  setSignUpFail,
  setIsPending,
} from './auth-reducer'

interface IActionWorker<P> {
  type: string
  payload: P
}

export function* fetchLoginWorker({ payload }: IActionWorker<ILoginInputs>) {
  try {
    yield put(setIsLoading(true))
    const { data }: AxiosResponse<AuthResponse> = yield call(AuthApi.login, payload)
    localStorage.setItem('token', data.accessToken)
    yield put(setAuthSuccess(data.user))
  } catch (e) {
    yield put(setSignInFail(e.response?.data?.message || 'Some error'))
    yield put(setSignInValidationError(e.response?.data?.errors))
  }
}

export function* fetchSignUpWorker({ payload }: IActionWorker<IRegisterInputs>) {
  try {
    yield put(setIsLoading(true))
    const { data }: AxiosResponse<AuthResponse> = yield call(AuthApi.registration, payload)
    localStorage.setItem('token', data.accessToken)
    yield put(setAuthSuccess(data.user))
  } catch (e) {
    yield put(setSignUpFail(e.response?.data?.message || 'Some errors'))
    yield put(setSignUpValidationError(e.response?.data?.errors))
  }
}

export function* fetchLogOutWorker() {
  try {
    yield call(AuthApi.logout)
    localStorage.removeItem('token')
    yield put(setIsAuth(false))
    yield put(setUserData({}))
  } catch (e) {
    console.log(e.response?.data?.message)
  }
}

export function* checkAuthWorker() {
  yield put(setIsPending(true))
  try {
    const { data }: AxiosResponse<AuthResponse> = yield call(AuthApi.refresh)
    localStorage.setItem('token', data.accessToken)
    yield put(setAuthSuccess(data.user))
  } catch (e) {
    console.log(e.response?.data?.message)
  } finally {
    yield put(setIsPending(false))
  }
}

export function* authSaga() {
  yield takeEvery(fetchLogin.type, fetchLoginWorker)
  yield takeEvery(fetchSignUp.type, fetchSignUpWorker)
  yield takeEvery(fetchLogout.type, fetchLogOutWorker)
  yield takeEvery(checkAuth.type, checkAuthWorker)
}
