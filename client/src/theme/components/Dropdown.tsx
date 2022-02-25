import React from 'react'
import styled from 'styled-components'
import { Arrow } from '..'
import { useOnClickOutside } from '../../hooks/useClickOutside'
import { CSSTransition } from 'react-transition-group'

interface IDropdown {
  title: string
  children: React.ReactChild
  isArrow?: boolean
}

export const Dropdown: React.FC<IDropdown> = ({ title, children, isArrow = true }) => {
  const [isOpen, setOpen] = React.useState<boolean>(false)
  const dropDownRef = React.useRef(null)

  React.useEffect(() => {
    setOpen(false)
  }, [title])

  const onToggle = (e: any) => {
    e.stopPropagation()
    setOpen((prev) => !prev)
  }

  useOnClickOutside(dropDownRef, () => setOpen(false))

  return (
    <StyledDropdown>
      <DropdownTrigger onClick={onToggle}>
        <span>{title}</span>
        {isArrow && <Arrow duration={300} isOpen={isOpen} />}
      </DropdownTrigger>
      <CSSTransition unmountOnExit in={isOpen} timeout={300} classNames='dropdown'>
        <DropdownContent ref={dropDownRef}>{children}</DropdownContent>
      </CSSTransition>
    </StyledDropdown>
  )
}

const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 10px;
  width: 200px;
  padding: 15px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0px 6px 11px 1px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  &.dropdown-enter {
    top: 0;
    opacity: 0;
    margin-top: 0;
  }
  &.dropdown-enter-active {
    top: 100%;
    opacity: 1;
    margin-top: 10px;
  }
  &.dropdown-exit {
    opacity: 1;
  }
  &.dropdown-exit-active {
    top: 0;
    opacity: 0;
    margin-top: 0;
  }
  &.dropdown-exit-done {
    top: 0;
    opacity: 0;
    margin-top: 0;
  }
`

const DropdownTrigger = styled.div`
  user-select: none;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  z-index: 2;
`

const StyledDropdown = styled.div`
  position: relative;
`
