import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'
import { IoMdClose } from 'react-icons/io'
import { useOnClickOutside } from '../../../hooks/useClickOutside'

interface IAdminModal {
  open: boolean
  children: React.ReactChild
  // title?: string
  // subtitle?: string
  onClose: () => void
  // logo?: boolean
  // overlayClose?: boolean
}

export const AdminModal: React.FC<IAdminModal> = ({ open, children, onClose }) => {
  const modalRef = React.useRef(null)
  const [isOpen, setIsOpen] = React.useState(open)

  React.useEffect(() => {
    setIsOpen(open)
  }, [open])

  // useOnClickOutside(modalRef, onClose)

  return ReactDOM.createPortal(
    <CSSTransition in={isOpen} unmountOnExit timeout={400} classNames='overlay'>
      <ModalOverlay>
        <StyledModal ref={modalRef}>
          <ModalHeader>
            {/* {title && <ModalTitle>{title}</ModalTitle>} */}
            <Close onClick={onClose} />
          </ModalHeader>
          {children}
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
  color: #fff;
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
  /* width: 100%; */
  max-width: 936px;
  display: block;
  border-radius: 3px;
  margin: auto;
  background-color: #1b1f2e;
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
