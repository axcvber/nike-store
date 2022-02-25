import React, { ReactElement } from 'react'
import { CSSTransition } from 'react-transition-group'
import { IoIosArrowBack } from 'react-icons/io'
import { NavLinks, peopleCategory } from '../../../../components/Navbar/navLinks'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Leftbar = () => {
  const [isOpen, setIsOpen] = React.useState<string | undefined>()
  const onMouseParamEnter = (param: string) => {
    setIsOpen(param)
  }
  const onMouseLeave = () => {
    setIsOpen(undefined)
  }

  return (
    <React.Fragment>
      <LeftBar>
        {peopleCategory.map((item, inx) => (
          <LeftBarItem
            key={`dropdown-title${inx}`}
            onMouseEnter={() => onMouseParamEnter(item.activeMenu)}
            onMouseLeave={onMouseLeave}
            isOpen={isOpen === item.activeMenu}
          >
            <span>{item.title}</span>
            <IoIosArrowBack />
          </LeftBarItem>
        ))}
      </LeftBar>

      {peopleCategory.map((item, inx) => (
        <LeftbarDropdown
          key={`dropdown-${inx}`}
          activeMenu={isOpen === item.activeMenu}
          arrLinks={item.arrLinks}
          onMouseEnter={() => onMouseParamEnter(item.activeMenu)}
          onMouseLeave={onMouseLeave}
          dropdownImg={item.dropdownImg}
        />
      ))}
    </React.Fragment>
  )
}

interface LeftbarDropdownProps {
  activeMenu: boolean | undefined
  arrLinks: Array<NavLinks>
  onMouseLeave: () => void
  onMouseEnter: () => void
  dropdownImg: string
}

const LeftbarDropdown: React.FC<LeftbarDropdownProps> = ({
  activeMenu,
  onMouseEnter,
  onMouseLeave,
  arrLinks,
  dropdownImg,
}): ReactElement => {
  return (
    <CSSTransition in={activeMenu} unmountOnExit timeout={500} classNames='dropdown'>
      <DropdownMenu onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} dropdownImg={dropdownImg}>
        {arrLinks.map((item, inx) => {
          return (
            <DropdownMenuLi key={`dropdown-link-${inx}`}>
              <DropdownMenuLink to={`${item.path}`}>{item.title}</DropdownMenuLink>
            </DropdownMenuLi>
          )
        })}
      </DropdownMenu>
    </CSSTransition>
  )
}

const LeftBar = styled.ul`
  user-select: none;
  display: flex;
  align-self: stretch;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  z-index: 99;
`
const LeftBarItem = styled.li<{ isOpen: boolean }>`
  display: flex;
  width: 30px;
  align-items: flex-start;
  cursor: pointer;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  margin: 30px 0;
  color: ${(props) => (props.isOpen ? props.theme.colors.primary : props.theme.colors.secondary)};
  transition: all ${(props) => props.theme.transition};
  svg {
    color: ${(props) => (props.isOpen ? props.theme.colors.primary : props.theme.colors.secondary)};
    margin-top: 5px;
    margin-right: 2px;
    transition: transform ${(props) => props.theme.transition};
    transform: ${(props) => (props.isOpen ? 'rotate(90deg)' : 'rotate(0deg)')};
  }
`
const DropdownMenu = styled.ul<{ dropdownImg: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${(props) => props.dropdownImg});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  color: #fff;
  z-index: 98;
  transition: all 0.4s ease-in-out;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  padding: 100px 0;

  &.dropdown-enter {
    transform: translateX(-100%);
    opacity: 0;
  }
  &.dropdown-enter-active {
    transform: translateX(0);
    opacity: 1;
  }
  &.dropdown-exit {
    opacity: 1;
  }
  &.dropdown-exit-active {
    transform: translateX(-100%);
    opacity: 0;
  }
`
const DropdownMenuLi = styled.li`
  background-color: #000;
  padding: 5px;
  margin: 15px 30px;
`
const DropdownMenuLink = styled(Link)`
  color: #fff;
  font-size: 20px;
  border-bottom: 2px solid transparent;
  transition: all ${(props) => props.theme.transition};
  &:hover {
    border-bottom: 2px solid #fff;
  }
`
