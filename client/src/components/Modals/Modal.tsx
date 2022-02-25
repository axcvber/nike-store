import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'
import { IoMdClose } from 'react-icons/io'
import { Logo } from '../Logo'
import { useOnClickOutside } from '../../hooks/useClickOutside'
import { useHideScrollbar } from '../../hooks/useHideScrollbar'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/rootReducer'
import { hideModal, resetModal } from '../../store/ducks/modals/modal-reducer'
import ResetForm from '../Forms/ResetForm'
import { RegisterForm } from '../Forms/RegisterForm'
import LoginForm from '../Forms/LoginForm'

interface ModalProps {
  // active: boolean
  // children: ReactChild
  // title?: string
  // subtitle?: string
  // onClose: () => void
  // logo?: boolean
  // overlayClose?: boolean
}

const MODAL_TYPES: any = {
  'login': LoginForm,
  'register': RegisterForm,
  'reset': ResetForm,
  'update': ResetForm,
}

export const Modal: React.FC = () => {
  const { modalType, modalProps, open, mounted } = useSelector((state: RootState) => state.modals)
  const modalRef = React.useRef(null)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = React.useState(open)

  const onExited = React.useCallback(
    (el: HTMLElement) => {
      document.body.setAttribute('style', '')
      if (el && !mounted) {
        dispatch(resetModal())
      }
    },
    [dispatch, mounted]
  )

  // const onExited = (el: HTMLElement) => {
  //   if (el) {
  //     setAnimateDone(true)
  //     dispatch(resetModal())
  //   }
  // }

  React.useEffect(() => {
    setIsOpen(open)
  }, [open])

  React.useEffect(() => {
    if (isOpen) {
      document.body.setAttribute('style', `padding-right: 16.5px; overflow: hidden;`)
    }
  }, [isOpen])

  const onClose = () => {
    dispatch(hideModal())
  }
  useOnClickOutside(modalRef, onClose)

  if (!modalType) {
    return null
  }

  const SpecifiedModal = MODAL_TYPES[modalType]
  return ReactDOM.createPortal(
    <CSSTransition in={isOpen} unmountOnExit timeout={400} classNames='overlay' onExited={onExited}>
      <ModalOverlay>
        <StyledModal ref={modalRef}>
          <ModalHeader>
            <input type='text' />
            {modalProps.logo && <Logo height={20} link={false} />}
            {modalProps.title && <ModalTitle>{modalProps.title}</ModalTitle>}
            {modalProps.description && <ModalSubtitle>{modalProps.description}</ModalSubtitle>}
            <Close onClick={onClose} />
          </ModalHeader>
          <SpecifiedModal />
        </StyledModal>
      </ModalOverlay>
    </CSSTransition>,
    document.getElementById('modal-root') as HTMLElement
  )
}

const ModalTitle = styled.h3`
  width: 280px;
  padding: 25px 0;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.third};
  font-weight: 700;
  font-size: 24px;
  text-transform: uppercase;
  text-align: center;
  line-height: 28px;
`

const ModalSubtitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${(props) => props.theme.fonts.secondary};
  font-weight: 400;
  line-height: 22px;
  text-align: center;
  padding-bottom: 10px;
`

export const ModalButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #000;
  padding: 0 16px;
  border: 1px solid #000;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
  text-transform: uppercase;
  font-family: ${(props) => props.theme.fonts.third};
`

const Close = styled(IoMdClose)`
  font-size: 32px;
  color: ${({ theme }) => theme.colors.primary};
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`

const ModalHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledModal = styled.div<{ modalHeight?: number | undefined }>`
  position: relative;
  padding: 25px 55px;
  width: 100%;
  max-width: 436px;
  display: block;
  border-radius: 3px;
  margin: auto;
  background-color: #fff;
  transition: all 0.4s ease-in-out;
  z-index: 99999;
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  z-index: 999;
  transition: all 0.4s ease-in-out;

  &.overlay-enter {
    opacity: 0;
    ${StyledModal} {
      opacity: 0;
      transform: translateY(30px);
    }
  }
  &.overlay-enter-active {
    opacity: 1;
    ${StyledModal} {
      opacity: 1;
      transform: translateY(0);
    }
  }
  &.overlay-exit {
    opacity: 1;
  }
  &.overlay-exit-active {
    opacity: 0;
    ${StyledModal} {
      opacity: 0;
      transform: translateY(30px);
    }
  }
`
