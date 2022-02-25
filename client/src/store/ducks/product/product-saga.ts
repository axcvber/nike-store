import { AxiosResponse } from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import { ICategoryInput } from '../../../pages/AdminPage/components/Categories'
import { IColorInput } from '../../../pages/AdminPage/components/Colors'
import { IProductInput } from '../../../pages/AdminPage/components/NewProduct'
import { ProductPageParams } from '../../../pages/ProductPage/ProductPage'
import ProductApi from '../../../services/api/ProductApi'
import {
  createCategory,
  createColor,
  createProduct,
  deleteCategory,
  deleteColor,
  deleteProduct,
  fetchCategories,
  fetchColors,
  fetchColorsWays,
  fetchDeleteProduct,
  fetchModels,
  fetchProduct,
  fetchProducts,
  IQueryString,
  setCategories,
  setColors,
  setColorsWays,
  setIsProductsPending,
  setModels,
  setProduct,
  setProductModel,
  setProducts,
  setTotalCount,
} from './product-slice'

interface IActionWorker<P> {
  type: string
  payload: P
}

export function* fetchProductsWorker({ payload }: IActionWorker<IQueryString>) {
  try {
    const { data }: AxiosResponse<any> = yield call(ProductApi.fetchProducts, payload)
    console.log('SAGA HUETA', payload)

    console.log('PRODUCTS_FROM_SAGA', data)
    if (data) {
      yield put(setProducts(data))
    }
  } catch (e) {
    console.log(e)
  }
}

export function* fetchProductWorker({ payload }: IActionWorker<ProductPageParams>) {
  try {
    const { data }: AxiosResponse<any> = yield call(ProductApi.fetchProduct, payload)
    console.log('DATA PRODUCT', data)

    yield put(setProduct(data.product))
    yield put(setProductModel(data.productModel))
  } catch (e) {
    console.log(e)
  }
}

export function* createProductWorker({ payload }: IActionWorker<IProductInput>) {
  try {
    const { data }: AxiosResponse<any> = yield call(ProductApi.createProduct, payload)
    console.log('product was created', data)
    // yield put(setOneProduct(data))
  } catch (e) {
    console.log(e)
  }
}

export function* deleteProductWorker({ payload }: IActionWorker<Array<number>>) {
  try {
    yield put(setIsProductsPending(true))
    const { data }: AxiosResponse<any> = yield call(ProductApi.deleteProduct, payload)
    if (data) {
      console.log('Product was deleted', data)
      yield put(deleteProduct(payload))
    }
  } catch (e) {
    console.log(e)
  }
}

export function* fetchModelsWorker({ payload }: IActionWorker<number>) {
  try {
    const { data }: AxiosResponse<any> = yield call(ProductApi.fetchModels, payload)
    yield put(setModels(data))
  } catch (e) {
    console.log(e)
  }
}

export function* fetchCategoriesWorker() {
  try {
    const { data }: AxiosResponse<any> = yield call(ProductApi.fetchCategories)
    console.log('setCategories', data)
    yield put(setCategories(data))
  } catch (e) {
    console.log(e)
  }
}

export function* createCategoryWorker({ payload }: IActionWorker<ICategoryInput>) {
  try {
    const { data }: AxiosResponse<any> = yield call(ProductApi.createCategory, payload)
    console.log('Type was created', data)
    // yield put(setCategories(data))
  } catch (e) {
    console.log(e)
  }
}

export function* deleteCategoryWorker({ payload }: IActionWorker<Array<number>>) {
  try {
    const { data }: AxiosResponse<any> = yield call(ProductApi.deleteCategory, payload)
    console.log('Types was deleted', data)
    // yield put(setTypes(data))
  } catch (e) {
    console.log(e)
  }
}

export function* fetchColorsWorker() {
  try {
    const { data }: AxiosResponse<any> = yield call(ProductApi.fetchColors)
    yield put(setColors(data))
  } catch (e) {
    console.log(e)
  }
}

export function* createColorWorker({ payload }: IActionWorker<IColorInput>) {
  try {
    const { data }: AxiosResponse<any> = yield call(ProductApi.createColor, payload)
    console.log('Color was created', data)
  } catch (e) {
    console.log(e)
  }
}

export function* deleteColorWorker({ payload }: IActionWorker<Array<number>>) {
  try {
    const { data }: AxiosResponse<any> = yield call(ProductApi.deleteColor, payload)
    console.log('Color was deleted', data)
    // yield put(setTypes(data))
  } catch (e) {
    console.log(e)
  }
}

export function* fetchColorsWaysWorker({ payload }: IActionWorker<string>) {
  try {
    const { data }: AxiosResponse<any> = yield call(ProductApi.fetchColorsWays, payload)
    console.log('fetchColorsWays', data)
    yield put(setColorsWays(data))
  } catch (e) {
    console.log(e)
  }
}

export function* productSaga() {
  yield takeEvery(fetchProducts.type, fetchProductsWorker)
  yield takeEvery(fetchProduct.type, fetchProductWorker)
  yield takeEvery(fetchCategories.type, fetchCategoriesWorker)
  yield takeEvery(createProduct.type, createProductWorker)
  yield takeEvery(fetchDeleteProduct.type, deleteProductWorker)

  yield takeEvery(createCategory.type, createCategoryWorker)
  yield takeEvery(deleteCategory.type, deleteCategoryWorker)

  yield takeEvery(fetchColors.type, fetchColorsWorker)
  yield takeEvery(createColor.type, createColorWorker)
  yield takeEvery(deleteColor.type, deleteColorWorker)

  yield takeEvery(fetchColorsWays.type, fetchColorsWaysWorker)

  yield takeEvery(fetchModels.type, fetchModelsWorker)
}
