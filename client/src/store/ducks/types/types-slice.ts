import { createAction, createSlice } from '@reduxjs/toolkit'
import { ITypesInput } from '../../../pages/AdminPage/components/Types'

export interface IFetchProducts {
  color: string | null
  sortBy: string | null
}

export const fetchTypes = createAction('types/fetchTypes')
export const createType = createAction<ITypesInput>('types/createType')
export const deleteTypes = createAction<Array<number>>('types/deleteType')

const initialState: any = {
  types: null,
}

const typeSlice = createSlice({
  name: 'types',
  initialState,
  reducers: {
    setTypes: (state, action) => {
      state.types = action.payload
    },
  },
})

export const { setTypes } = typeSlice.actions
export default typeSlice.reducer
