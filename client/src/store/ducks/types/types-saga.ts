import { AxiosResponse } from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import { ITypesInput } from '../../../pages/AdminPage/components/Types'
import TypeApi from '../../../services/api/TypeApi'
import { createType, deleteTypes, fetchTypes, setTypes } from './types-slice'

interface IActionWorker<P> {
  type: string
  payload: P
}

export function* fetchTypesWorker() {
  try {
    const { data }: AxiosResponse<any> = yield call(TypeApi.fetchTypes)
    console.log('Types', data)
    yield put(setTypes(data))
  } catch (e) {
    console.log(e)
  }
}

export function* createTypeWorker({ payload }: IActionWorker<ITypesInput>) {
  try {
    const { data }: AxiosResponse<any> = yield call(TypeApi.createType, payload)
    console.log('Type was created', data)
    // yield put(setTypes(data))
  } catch (e) {
    console.log(e)
  }
}

export function* deleteTypesWorker({ payload }: IActionWorker<Array<number>>) {
  try {
    const { data }: AxiosResponse<any> = yield call(TypeApi.deleteTypes, payload)
    console.log('Types was deleted', data)
    // yield put(setTypes(data))
  } catch (e) {
    console.log(e)
  }
}

export function* typesSaga() {
  yield takeEvery(fetchTypes.type, fetchTypesWorker)
  yield takeEvery(createType.type, createTypeWorker)
  yield takeEvery(deleteTypes.type, deleteTypesWorker)
}
