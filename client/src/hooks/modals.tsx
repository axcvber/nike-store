import React from 'react'
import { useDispatch } from 'react-redux'
import { showModal } from '../store/ducks/modals/modal-reducer'

export const useSignInModal = () => {
  const dispatch = useDispatch()
  return React.useCallback(() => {
    dispatch(
      showModal({
        modalType: 'login',
        mounted: true,
        modalProps: {
          title: 'YOUR ACCOUNT FOR EVERYTHING NIKE',
          description: '',
          logo: true,
        },
      })
    )
  }, [dispatch])
}

export const useSignUpModal = () => {
  const dispatch = useDispatch()
  return React.useCallback(() => {
    dispatch(
      showModal({
        modalType: 'register',
        modalProps: {
          title: 'BECOME A NIKE MEMBER',
          description:
            'Create your Nike Member profile and get first access to the very best of Nike products, inspiration and community.',
          logo: true,
        },
      })
    )
  }, [dispatch])
}

export const useResetPasswordModal = () => {
  const dispatch = useDispatch()
  return React.useCallback(() => {
    dispatch(
      showModal({
        modalType: 'reset',
        modalProps: {
          title: 'RESET PASSWORD',
          description: 'Enter your email to receive instructions on how to reset your password.',
          logo: true,
        },
      })
    )
  }, [dispatch])
}

export const useUpdatedModal = () => {
  const dispatch = useDispatch()
  return React.useCallback(() => {
    dispatch(
      showModal({
        modalType: 'update',
        modalProps: {
          title: 'update',
          description: '',
          logo: false,
        },
      })
    )
  }, [dispatch])
}
