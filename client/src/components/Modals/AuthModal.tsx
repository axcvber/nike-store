import React from 'react'
import styled from 'styled-components'
import { A } from '../../theme'

interface AuthModalProps {
  onClose: () => void
  type: 'signIn' | 'signUp' | 'reset' | undefined
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, type }) => {
  const [typeModal, setTypeModal] = React.useState<'signIn' | 'signUp' | 'reset' | undefined>(type)

  React.useEffect(() => {
    setTypeModal(type)
  }, [type])

  return (
    <div>sad</div>
    // <>
    //   <Modal active={typeModal === 'signIn'} onClose={onClose} logo title='YOUR ACCOUNT FOR EVERYTHING NIKE'>
    //     <LoginForm toSignUp={() => setTypeModal('signUp')} toReset={() => setTypeModal('reset')} />
    //   </Modal>
    //   <Modal
    //     active={typeModal === 'signUp'}
    //     onClose={onClose}
    //     logo
    //     title='BECOME A NIKE MEMBER'
    //     subtitle='Create your Nike Member profile and get first access to the very best of Nike products, inspiration and community.'
    //   >
    //     <RegisterForm toSignIn={() => setTypeModal('signIn')} />
    //   </Modal>
    //   <Modal
    //     active={typeModal === 'reset'}
    //     onClose={onClose}
    //     logo
    //     title='RESET PASSWORD'
    //     subtitle='Enter your email to receive instructions on how to reset your password.'
    //   >
    //     <ResetForm toSignIn={() => setTypeModal('signIn')} />
    //   </Modal>
    // </>
  )
}

export const Terms: React.FC<{ text: string }> = ({ text }) => {
  return (
    <StyledTerms>
      {`${text}, you agree to Nike's`}
      <A
        href='https://agreementservice.svs.nike.com/rest/agreement?agreementType=privacyPolicy&country=US&language=en&mobileStatus=false&requestType=redirect&uxId=com.nike.commerce.nikedotcom.web'
        target='_blank'
        rel='noopener noreferrer'
      >
        Privacy Policy
      </A>
      and
      <A
        href='https://agreementservice.svs.nike.com/rest/agreement?agreementType=termsOfUse&country=US&language=en&mobileStatus=false&requestType=redirect&uxId=com.nike.commerce.nikedotcom.web'
        target='_blank'
        rel='noopener noreferrer'
      >
        Terms of Use.
      </A>
    </StyledTerms>
  )
}

const StyledTerms = styled.p`
  padding: 0 5px;
  color: ${({ theme }) => theme.colors.secondary};
  text-align: center;
  margin: 20px 0;
  font-size: 12px;
  line-height: 16px;
  a {
    padding: 0 3px;
  }
`

export const FormNavLink = styled.span`
  margin-left: 4px;
  font-size: 12px;
  color: ${(props) => props.theme.colors.primary};
  text-decoration: underline;
  cursor: pointer;
`
