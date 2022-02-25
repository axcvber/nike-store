import { createAction, createSlice } from '@reduxjs/toolkit'
import { ICategoryInput } from '../../../pages/AdminPage/components/Categories'
import { IColorInput } from '../../../pages/AdminPage/components/Colors'
import { IProductInput } from '../../../pages/AdminPage/components/NewProduct'
import { ProductPageParams } from '../../../pages/ProductPage/ProductPage'

export interface IQueryString {
  cat?: string | undefined
  price?: Array<number> | undefined
  gender?: Array<string> | undefined
  color?: Array<number> | undefined
  sortBy?: string | undefined
  size?: number | undefined
  page?: number | undefined
}

export const fetchProducts = createAction<IQueryString>('product/fetchProducts')
export const fetchProduct = createAction<ProductPageParams>('product/fetchProduct')
export const createProduct = createAction<any>('product/createProduct')
export const fetchDeleteProduct = createAction<Array<number>>('product/fetchDeleteProduct')

export const fetchModels = createAction<number>('product/fetchModels')

export const fetchCategories = createAction('product/fetchCategories')
export const createCategory = createAction<ICategoryInput>('product/createCategory')
export const deleteCategory = createAction<Array<number>>('types/deleteCategory')

export const fetchColors = createAction('product/fetchColors')
export const createColor = createAction<IColorInput>('product/createColor')
// export const deleteColor = createAction<Array<number>>('product/deleteColor')

export const fetchColorsWays = createAction<string>('product/fetchColorsWays')

const initialState: any = {
  isProductsPending: false,
  products: null,
  models: null,
  product: null,
  productModel: null,
  colorways: null,
  categories: null,
  productCat: null,
  colors: null,
  totalPages: 0,
  currentPage: 1,
  totalCount: null,
  pageSize: 10,
  filter: {
    price: undefined,
    gender: undefined,
    color: undefined,
    cat: undefined,
    sortBy: undefined,
    page: undefined,
    size: undefined,
  },
  filters: {
    categories: null,
    genders: null,
    colors: null,
    sizes: null,
  },
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setIsProductsPending: (state, action) => {
      state.isPending = action.payload
    },
    setProducts: (state, action) => {
      state.totalCount = action.payload.totalCount
      state.products = action.payload.products
      state.totalPages = action.payload.totalPages
      state.currentPage = action.payload.currentPage
      state.filters.colors = action.payload.filterList.colors
      state.filters.sizes = action.payload.filterList.sizes
      state.filters.categories = action.payload.filterList.categories
      state.filters.genders = action.payload.filterList.genders
    },
    setModels: (state, action) => {
      state.models = action.payload
    },
    setColors: (state, action) => {
      state.colors = action.payload
    },
    deleteColor: (state, { payload }) => {
      state.colors = state.colors.filter(({ id }: any) => !payload.includes(id))
      state.isPending = false
    },
    setFilter: (state, action) => {
      state.filter = action.payload
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload
    },
    setPage: (state, action) => {
      state.filter.page = action.payload
    },
    setProduct: (state, action) => {
      state.product = action.payload
    },
    setProductModel: (state, action) => {
      state.productModel = action.payload
    },
    deleteProduct: (state, { payload }) => {
      console.log('deleteProduct', payload)
      state.products = state.products.filter(({ id }: any) => !payload.includes(id))
      state.isPending = false
    },
    resetProduct: (state) => {
      state.product = null
    },
    resetProducts: (state) => {
      state.products = null
      state.totalCount = null
    },
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    setColorsWays: (state, action) => {
      state.colorways = action.payload
    },

    setCat: (state, action) => {
      state.filter.cat = action.payload
    },
    // setColor: (state, action) => {
    //   if (state.filter.color.includes(action.payload)) {
    //     state.filter.color = state.filter.color.filter((item: any) => item !== action.payload)
    //   } else {
    //     state.filter.color.push(action.payload)
    //   }
    // },
    setColor: (state, action) => {
      if (!Array.isArray(state.filter.color)) {
        state.filter.color = [action.payload]
      } else {
        if (state.filter.color.includes(action.payload)) {
          state.filter.color = state.filter.color.filter((item: any) => item !== action.payload)
        } else {
          state.filter.color.push(action.payload)
        }
      }
    },

    setGender: (state, action) => {
      if (!Array.isArray(state.filter.gender)) {
        state.filter.gender = [action.payload]
      } else {
        if (state.filter.gender.includes(action.payload)) {
          state.filter.gender = state.filter.gender.filter((item: any) => item !== action.payload)
        } else {
          state.filter.gender.push(action.payload)
        }
      }
    },
    setPrice: (state, action) => {
      state.filter.price = action.payload
    },
    setSortBy: (state, action) => {
      state.filter.sortBy = action.payload
    },

    setSize: (state, action) => {
      if (!Array.isArray(state.filter.size)) {
        state.filter.size = [action.payload]
      } else {
        if (state.filter.size.includes(action.payload)) {
          state.filter.size = state.filter.size.filter((item: any) => item !== action.payload)
        } else {
          state.filter.size.push(action.payload)
        }
      }
    },

    removeFilterAttr: (state) => {
      state.filter = {
        price: undefined,
        gender: undefined,
        color: undefined,
        cat: undefined,
        sortBy: undefined,
        page: undefined,
        size: undefined,
      }
    },

    setFilterr: (state, action) => {
      // state.filter = action.payload
      const { cat, color, gender, price, size, sortBy, page } = action.payload
      if (cat) {
        state.filter.cat = cat
      }
      if (price) {
        if (Array.isArray(price)) {
          state.filter.price = price
        }
      }
      if (gender) {
        if (!Array.isArray(gender)) {
          state.filter.gender = [gender]
        } else {
          state.filter.gender = gender
        }
      }
      if (color) {
        if (!Array.isArray(color)) {
          state.filter.color = [color]
        } else {
          state.filter.color = color
        }
      }

      if (size) {
        if (!Array.isArray(size)) {
          state.filter.size = [size]
        } else {
          state.filter.size = size
        }
      }
      if (sortBy) {
        state.filter.sortBy = sortBy
      }
      if (page) {
        state.filter.page = page
      }
    },
  },
})

export const {
  setProducts,
  resetProducts,
  deleteProduct,
  setTotalCount,
  setModels,
  setPage,
  setProduct,
  setProductModel,
  setCategories,
  setColors,
  deleteColor,
  resetProduct,
  setIsProductsPending,
  setColorsWays,
  setCat,
  setColor,
  setGender,
  setPrice,
  setSortBy,
  setFilterr,
  removeFilterAttr,
  setSize,
} = productSlice.actions
export default productSlice.reducer
