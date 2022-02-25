import React from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ModalButton } from '../Modals/Modal'
import { Field } from '../Field'
import { Flex, Span } from '../../theme'
import { FormNavLink } from '../Modals/AuthModal'
import { useDispatch } from 'react-redux'
import { showModal } from '../../store/ducks/modals/modal-reducer'
import { useSignInModal } from '../../hooks/modals'

interface IResetInputs {
  email: string
}

const ResetSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email address.').required('Please enter a email address.'),
})

const ResetForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, isSubmitting },
  } = useForm<IResetInputs>({
    mode: 'onChange',
    defaultValues: { email: '' },
    resolver: yupResolver(ResetSchema),
  })
  const onSignInModal = useSignInModal()

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ email: '' })
    }
  }, [isSubmitSuccessful, reset])

  const onSubmit = (data: IResetInputs) => {
    console.log(data)
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field control={control} name='email' placeholder='Email address' type='email' />
        <ModalButton type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Processing...' : 'Reset'}
        </ModalButton>
      </form>

      <Flex justify='center' alignItems='center' margin={'20px 0 0 0'}>
        <Span color='secondary'>Or return to</Span>
        <FormNavLink
          onClick={(e) => {
            e.stopPropagation()
            onSignInModal()
          }}
        >
          Log In.
        </FormNavLink>
      </Flex>
    </>
  )
}

export default ResetForm
