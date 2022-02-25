import React from 'react'
import { useHistory } from 'react-router-dom'
import LoginForm from '../components/Forms/LoginForm'

const LoginPage = () => {
  const history = useHistory()

  const toReset = () => {
    history.push('/reset')
  }

  const toSignUp = () => {
    history.push('/signUp')
  }

  return <LoginForm toReset={toReset} toSignUp={toSignUp} />
}

export default LoginPage
