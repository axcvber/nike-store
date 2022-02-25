import React from 'react'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'
import { NavbarIcons } from './NavbarIcons'
import { CSSTransition } from 'react-transition-group'
import { NavLink } from 'react-router-dom'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { useHideScrollbar } from '../../../hooks/useHideScrollbar'
import { Button, Flex, Span } from '../../../theme'
import { useDispatch, useSelector } from 'react-redux'
import { showModal } from '../../../store/ducks/modals/modal-reducer'
import { RootState } from '../../../store/rootReducer'
import { NavbarData, NavLinks, peopleCategory, userWidgetLinks } from '../navLinks'
import { BiUser, BiLogOut } from 'react-icons/bi'
import { useSignInModal, useSignUpModal } from '../../../hooks/modals'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onLogout: () => void
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onLogout }) => {
  const [activeMenu, setActiveMenu] = React.useState('main')
  const [menuHeight, setMenuHeight] = React.useState<number | undefined>(undefined)
  const { data, isAuth } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const onSignInModal = useSignInModal()
  const onSignUpModal = useSignUpModal()

  useHideScrollbar(isOpen)

  const onExited = (el: HTMLElement) => {
    if (el) {
      setActiveMenu('main')
    }
  }

  const calcHeight = (el: HTMLElement) => {
    const height = el.offsetHeight
    setMenuHeight(height)
  }

  const handleSignUp = async () => {
    await onClose()
    onSignUpModal()
  }

  const handleSignIn = async () => {
    await onClose()
    onSignInModal()
  }

  return (
    <>
      <CSSTransition in={isOpen} unmountOnExit timeout={300} classNames='overlay' onExited={onExited}>
        <MenuOverlay onClick={onClose} />
      </CSSTransition>
      <CSSTransition in={isOpen} unmountOnExit timeout={300} classNames='menu' onEnter={calcHeight}>
        <Menu menuHeight={menuHeight}>
          <CSSTransition
            in={activeMenu === 'main'}
            timeout={500}
            classNames='menu-primary'
            unmountOnExit
            onEnter={calcHeight}
          >
            <InnerMenu>
              {isAuth && (
                <MenuNavItem onClick={() => setActiveMenu('user')}>
                  <Flex alignItems='center'>
                    <BiUser />
                    <span style={{ marginLeft: '5px', fontSize: '16px' }}>{`Hi, ${data.firstName}`}</span>
                  </Flex>
                  <HiOutlineChevronRight />
                </MenuNavItem>
              )}
              {NavbarData.map((item, inx) => {
                return (
                  <MenuNavItem key={`menuLink${inx}`}>
                    <MenuNavRef onClick={onClose} to={item.path} activeClassName='any' exact>
                      {item.title}
                    </MenuNavRef>
                  </MenuNavItem>
                )
              })}

              {peopleCategory.map((item, inx) => (
                <MenuNavItem key={`title-mobile-menu${inx}`} onClick={() => setActiveMenu(item.activeMenu)}>
                  <span>{item.title}</span>
                  <HiOutlineChevronRight />
                </MenuNavItem>
              ))}

              {!isAuth && (
                <div>
                  <Button variant='primary' onClick={handleSignUp}>
                    Регистрация
                  </Button>
                  <Button style={{ marginTop: 10 }} onClick={handleSignIn}>
                    Войти
                  </Button>
                </div>
              )}
            </InnerMenu>
          </CSSTransition>

          <MenuItem
            activeMenu={activeMenu === 'user'}
            calcHeight={calcHeight}
            arrLinks={userWidgetLinks}
            onBack={() => setActiveMenu('main')}
            onClose={onClose}
            onLogout={onLogout}
          />

          {peopleCategory.map((item, inx) => (
            <MenuItem
              key={`menu-item-${inx}`}
              activeMenu={activeMenu === item.activeMenu}
              calcHeight={calcHeight}
              arrLinks={item.arrLinks}
              onBack={() => setActiveMenu('main')}
              onClose={onClose}
            />
          ))}
        </Menu>
      </CSSTransition>
    </>
  )
}

interface MenuItemProps {
  activeMenu: boolean | undefined
  calcHeight: (el: HTMLElement) => void
  arrLinks: Array<NavLinks>
  onBack: () => void
  onClose: () => void
  onLogout?: () => void
}

const MenuItem: React.FC<MenuItemProps> = ({ activeMenu, calcHeight, arrLinks, onBack, onClose, onLogout }) => {
  return (
    <CSSTransition in={activeMenu} unmountOnExit timeout={400} classNames='menu-secondary' onEnter={calcHeight}>
      <InnerMenu>
        <MenuNavHeader onClick={onBack}>
          <HiOutlineChevronLeft />
          <span>Назад</span>
        </MenuNavHeader>
        {arrLinks.map((item, inx) => {
          return (
            <MenuNavItem key={`menuTypeLink${inx}`}>
              {item.icon && <item.icon />}
              <MenuNavRef onClick={onClose} to={item.path} activeClassName='any'>
                {item.title}
              </MenuNavRef>
            </MenuNavItem>
          )
        })}
        {!!onLogout && (
          <Flex alignItems='center'>
            <BiLogOut />
            <span
              onClick={() => {
                onClose()
                onLogout()
              }}
            >
              Log Out
            </span>
          </Flex>
        )}
      </InnerMenu>
    </CSSTransition>
  )
}

const MenuNavItem = styled.li`
  margin: 20px 0;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  &:active {
    color: ${(props) => props.theme.colors.secondary};
  }
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin: 0;
  }
`
const MenuNavRef = styled(NavLink)`
  width: 100%;
  color: ${(props) => props.theme.colors.primary};
  font-size: 20px;
  position: relative;
  &:active {
    color: ${(props) => props.theme.colors.secondary};
  }
  &.${(props) => props.activeClassName} {
    &:before {
      content: '';
      width: 6px;
      height: 3px;
      position: absolute;
      top: 50%;
      left: -12px;
      transform: translateY(-50%);
      background-color: ${(props) => props.theme.colors.primary};
    }
  }
`
const MenuNavHeader = styled.li`
  display: inline-flex;
  align-items: center;
  font-size: 16px;
  margin-left: -5px;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  svg {
    margin-right: 10px;
    font-size: 20px;
  }
`

const InnerMenu = styled.ul`
  width: 100%;
  padding: 30px 40px;
  user-select: none;
  &.menu-primary-enter {
    position: absolute;
    transform: translateX(-110%);
  }

  &.menu-primary-enter-active {
    transform: translateX(0%);
    transition: all 0.3s ease;
  }

  &.menu-primary-exit {
    position: absolute;
  }

  &.menu-primary-exit-active {
    transform: translateX(-110%);
    transition: all 0.3s ease;
  }

  &.menu-secondary-enter {
    transform: translateX(110%);
  }

  &.menu-secondary-enter-active {
    transform: translateX(0%);
    transition: all 0.3s ease;
  }
  &.menu-secondary-exit-active {
    transform: translateX(110%);
    transition: all 0.3s ease;
  }
`

const Menu = styled.nav<{ menuHeight: number | undefined }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  max-height: 100%;
  height: ${(props) => props.menuHeight + 'px'};
  background-color: ${({ theme }) => theme.colors.bg.primary};
  overflow-x: hidden;
  overflow-y: auto;
  transition: all 0.3s ease;
  border-bottom-left-radius: 5px;
  z-index: 9999;
  &.menu-enter {
    transform: translateX(100%);
  }
  &.menu-enter-active {
    transform: translateX(0);
  }

  &.menu-exit-active {
    transform: translateX(100%);
  }
`

const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  background-color: hsla(0, 0%, 7%, 0.36);
  transition: all 0.3s ease-in-out;
  z-index: 999;
  &.overlay-enter {
    opacity: 0;
  }
  &.overlay-enter-active {
    opacity: 1;
  }

  &.overlay-exit-active {
    opacity: 0;
  }
`
