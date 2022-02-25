import { CaseReducer, createAction, createSlice, PayloadAction, PayloadActionCreator } from '@reduxjs/toolkit'
import { ILoginInputs } from '../../../components/Forms/LoginForm'
import { IRegisterInputs } from '../../../components/Forms/RegisterForm'

export const fetchLogin = createAction<ILoginInputs>('auth/fetchLogin')
export const fetchSignUp = createAction<IRegisterInputs>('auth/fetchSignUp')
export const checkAuth = createAction('auth/checkAuth')

const initialState: any = {
  data: {},
  isLoading: false,
  isPending: false,
  isAuth: false,
  signInError: '',
  signUpError: '',
  signInValidationError: [],
  signUpValidationError: [],
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setIsPending: (state, action) => {
      state.isPending = action.payload
    },
    setUserData: (state, action) => {
      state.data = action.payload
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload
    },
    fetchLogout: () => initialState,
    setAuthSuccess: (state, action) => {
      state.isLoading = false
      state.data = action.payload
      state.isAuth = true
      state.signInError = ''
      state.signUpError = ''
    },
    setSignInFail: (state: any, action: PayloadAction<string>) => {
      state.isLoading = false
      state.signInError = action.payload
    },
    setSignUpFail: (state: any, action: PayloadAction<string>) => {
      state.isLoading = false
      state.signUpError = action.payload
    },
    setSignInValidationError: (state: any, action: PayloadAction<any>) => {
      state.signInValidationError = action.payload
    },
    setSignUpValidationError: (state: any, action: PayloadAction<any>) => {
      state.signUpValidationError = action.payload
    },
  },
})

export const {
  setIsPending,
  setIsLoading,
  setUserData,
  setIsAuth,
  setSignInValidationError,
  setSignUpValidationError,
  setAuthSuccess,
  setSignInFail,
  setSignUpFail,
  fetchLogout,
} = authSlice.actions
export default authSlice.reducer
