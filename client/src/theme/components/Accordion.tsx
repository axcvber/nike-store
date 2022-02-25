import React, { ReactChild } from 'react'
import { CSSTransition, Transition } from 'react-transition-group'
import styled, { css } from 'styled-components'
import { Arrow } from '..'

interface IAccordion {
  title: string
  children: ReactChild
  withBorder?: boolean
  defaultOpen?: boolean
  size?: 'large'
}

export const Accordion: React.FC<IAccordion> = ({ title, children, withBorder, defaultOpen = true, size }) => {
  const [isOpen, setOpen] = React.useState<boolean>(defaultOpen)
  const [accHeight, setAccHeight] = React.useState<number | undefined>(undefined)
  const accRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (accRef.current) {
      setAccHeight(accRef.current.scrollHeight)
    }
  }, [accRef, children])

  const onToggle = () => {
    setOpen((prev) => !prev)
  }

  const calcHeight = (el: HTMLElement) => {
    if (el) {
      setAccHeight(el.scrollHeight)
    }
  }

  const duration = 300

  const defaultStyle = {
    transition: `height ${duration}ms ease`,
  }

  const transitionStyles: any = {
    entering: { overflow: 'hidden', height: accHeight + 'px' },
    entered: { overflow: 'visible', height: accHeight + 'px' },
    exiting: { overflow: 'hidden', height: '0px' },
    exited: { overflow: 'hidden', height: '0px' },
  }

  return (
    <StyledAccordion withBorder={withBorder}>
      <AccordionTrigger onClick={onToggle} size={size}>
        <span>{title}</span>
        <Arrow duration={duration} isOpen={isOpen}></Arrow>
      </AccordionTrigger>

      {/* <CSSTransition mountOnEnter in={isOpen} timeout={300} classNames='dropdown' onEnter={calcHeight}>
        <AccordionContent ref={accRef} accHeight={accHeight}>
          {children}
        </AccordionContent>
      </CSSTransition> */}

      <Transition in={isOpen} mountOnEnter timeout={duration} onEnter={calcHeight}>
        {(state) => (
          <div
            ref={accRef}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <AccordionContent size={size}>{children}</AccordionContent>
          </div>
        )}
      </Transition>
    </StyledAccordion>
  )
}

const AccordionContent = styled.div<{ size?: 'large' }>`
  padding-bottom: ${({ size }) => (size === 'large' ? '20px' : '12px')};
  transition: all 0.3s ease;
  input {
    width: 100%;
  }
`

const StyledAccordion = styled.div<{ withBorder?: boolean }>`
  ${({ withBorder }) =>
    withBorder &&
    css`
      border-top: 1px solid #d8d5db;
      border-bottom: 1px solid #d8d5db;
    `}
  width: 100%;
  border-top: 1px solid #d8d5db;
  display: flex;
  flex-direction: column;
`

const AccordionTrigger = styled.div<{ size?: 'large' }>`
  padding: 12px 0;
  font-size: 16px;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  ${({ size }) =>
    size === 'large' &&
    css`
      padding: 20px 0;
      span {
        font-size: 20px;
      }
    `}
`
