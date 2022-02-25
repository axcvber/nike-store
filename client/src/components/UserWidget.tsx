import React from 'react'
import { BiUser, BiLogOut } from 'react-icons/bi'
import { AiOutlineInbox } from 'react-icons/ai'
import { IoSettingsOutline } from 'react-icons/io5'
import { CSSTransition } from 'react-transition-group'
import styled, { css } from 'styled-components'
import { IoIosArrowDown } from 'react-icons/io'
import { Flex, Span } from '../theme'
import { RiAdminLine } from 'react-icons/ri'

import { Link } from 'react-router-dom'

interface IUserWidget {
  name: string
  role: string
  onLogout: () => void
}

export const UserWidget: React.FC<IUserWidget> = ({ name, role, onLogout }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const onMouseEnter = () => {
    setIsOpen((prev) => !prev)
  }
  const onMouseLeave = () => {
    setIsOpen(false)
  }

  console.log(role)

  return (
    <WidgetWrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <WidgetTrigger>
        <UserName>{`Hi, ${name}`}</UserName>
        <WidgetArrow isOpen={isOpen} />
      </WidgetTrigger>

      <CSSTransition in={isOpen} unmountOnExit timeout={200} classNames='widget'>
        <WidgetDropdown>
          {role === 'ADMIN' && (
            <WidgetOption>
              <RiAdminLine />
              <WidgetLink to='/admin'>Admin Panel</WidgetLink>
            </WidgetOption>
          )}

          <WidgetOption>
            <BiUser />
            <WidgetLink to='/profile'>Profile</WidgetLink>
          </WidgetOption>

          <WidgetOption>
            <AiOutlineInbox />
            <WidgetLink to='/orders'>Orders</WidgetLink>
          </WidgetOption>

          <WidgetOption>
            <IoSettingsOutline />
            <WidgetLink to='/settings'>Settings</WidgetLink>
          </WidgetOption>

          <WidgetOption>
            <BiLogOut />
            <span style={{ fontSize: '14px' }} onClick={onLogout}>
              Log Out
            </span>
          </WidgetOption>
        </WidgetDropdown>
      </CSSTransition>
    </WidgetWrapper>
  )
}

const WidgetOption = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  color: ${({ theme }) => theme.colors.primary};
  svg {
    font-size: 18px;
    margin-right: 5px;
  }
  &:hover {
    cursor: pointer;
    background-color: #ececec;
  }
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    color: #d34546;
    margin-bottom: 0;
  }
`

const WidgetLink = styled(Link)`
  color: inherit;
  font-size: 14px;
  &:first-child {
    margin-top: 0;
  }
`

const UserName = styled.span`
  font-size: 14px;
`

const WidgetTrigger = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`

const WidgetArrow = styled(IoIosArrowDown)<{ isOpen: boolean }>`
  transition: transform 0.2s ease-in-out;
  margin-left: 5px;
  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: ${(isOpen) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
    `}
`

const WidgetDropdown = styled.ul`
  position: absolute;
  width: 150px;
  top: 100%;
  right: 0;
  margin-top: 5px;
  /* padding: 15px; */
  background-color: ${({ theme }) => theme.colors.bg.primary};
  box-shadow: 0px 4px 9px 2px rgba(0, 0, 0, 0.34);
  transition: all 0.2s ease-in-out;
  border-radius: 3px;
  display: flex;
  flex-direction: column;

  &.widget-enter {
    transform: translate(0, 10px);
    opacity: 0;
  }
  &.widget-enter-active {
    transform: translate(0, 0);
    opacity: 1;
  }
  &.widget-exit {
    opacity: 1;
  }
  &.widget-exit-active {
    transform: translate(0, 10px);
    opacity: 0;
  }
`

const WidgetWrapper = styled.div`
  position: relative;
`
