import React from 'react'
import styled from 'styled-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Error, Flex, Span } from '../../theme'
import { ModalButton } from '../Modals/Modal'
import { Field } from '../Field'
import { Checkbox } from '../Checkbox'
import { FormNavLink, Terms } from '../Modals/AuthModal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/rootReducer'
import { hideModal, showModal } from '../../store/ducks/modals/modal-reducer'
import { fetchLogin } from '../../store/ducks/auth/auth-reducer'
import { useResetPasswordModal, useSignUpModal } from '../../hooks/modals'

interface ILoginForm {
  toReset?: () => void
  toSignUp?: () => void
}

export interface ILoginInputs {
  email: string
  password: string
  rememberMe: boolean
}

const LoginFormState = {
  email: '',
  password: '',
  rememberMe: true,
}

const LoginSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email address.').required('Please enter a email address.'),
  password: yup.string().trim().max(36, 'Maximum of 36 characters.').required('Please enter a password.'),
})

const LoginForm: React.FC<ILoginForm> = ({ toReset, toSignUp }) => {
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitSuccessful, isSubmitted },
  } = useForm<ILoginInputs>({
    mode: 'onChange',
    defaultValues: LoginFormState,
    // resolver: yupResolver(LoginSchema),
    shouldUnregister: false,
  })

  const { isAuth, signInError, signInValidationError, isLoading } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const onSignUpModal = useSignUpModal()
  const onResetPasswordModal = useResetPasswordModal()

  const onSignUp = (e: any) => {
    e.stopPropagation()
    if (!!toSignUp) {
      toSignUp()
    } else {
      onSignUpModal()
    }
  }

  const onReset = (e: any) => {
    e.stopPropagation()
    if (!!toReset) {
      toReset()
    } else {
      onResetPasswordModal()
    }
  }

  React.useEffect(() => {
    if (signInValidationError && isSubmitted) {
      signInValidationError.forEach(({ param, msg }: any) => setError(param, { type: 'manual', message: msg }))
    }

    //   validationError.map((item: any) => {
    //     return setError(item.param, {
    //       type: 'manual',
    //       message: item.msg,
    //     })
    //   })
    // }
  }, [signInValidationError, isSubmitted, setError])

  React.useEffect(() => {
    if (isSubmitSuccessful && !signInError && !isLoading) {
      reset(LoginFormState)
      if (isAuth) {
        dispatch(hideModal())
      }
    }
  }, [isSubmitSuccessful, reset, isAuth, dispatch, signInError, isLoading])

  const onSubmit: SubmitHandler<ILoginInputs> = async (data) => {
    dispatch(fetchLogin(data))
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Error>{isSubmitted && signInError}</Error>
        <Field control={control} name='email' placeholder='Email address' type='email' />
        <Field control={control} name='password' placeholder='Password' type='password' />
        <FormOptions>
          <Checkbox control={control} name='rememberMe' label='Keep me signed in' />
          <ForgotPassword
            color='gray'
            onClick={(e) => {
              onReset(e)
            }}
          >
            Forgot password?
          </ForgotPassword>
        </FormOptions>
        <Terms text='By logging in' />
        <ModalButton type='submit' disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Sign in'}
        </ModalButton>
        <Flex justify='center' alignItems='center' margin={'20px 0 0 0'}>
          <Span color='secondary'>Not a member?</Span>
          <FormNavLink
            onClick={(e) => {
              onSignUp(e)
            }}
          >
            Join Us.
          </FormNavLink>
        </Flex>
      </form>
    </React.Fragment>
  )
}

const FormOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const ForgotPassword = styled(Span)`
  cursor: pointer;
`
export default LoginForm
