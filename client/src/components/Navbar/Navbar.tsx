import React from 'react'
import styled, { ThemeContext } from 'styled-components'
import { MobileMenu } from './components/MobileMenu'
import { NavbarIcons } from './components/NavbarIcons'
import { useMediaQuery } from 'react-responsive'
import { Logo } from '../Logo'
import { Navigation } from './components/Navigation'
import { AiOutlineMenu } from 'react-icons/ai'
import { Container, Flex, Span } from '../../theme'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/rootReducer'
import { fetchLogout } from '../../store/ducks/auth/auth-reducer'
import { UserWidget } from '../UserWidget'
import { showModal } from '../../store/ducks/modals/modal-reducer'
import { useSignInModal, useSignUpModal } from '../../hooks/modals'

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [stickyNav, setStickyNav] = React.useState(false)
  const themeContext = React.useContext(ThemeContext)
  const table = useMediaQuery({ maxWidth: themeContext.breakpoints.lg })
  const mobile = useMediaQuery({ maxWidth: themeContext.breakpoints.sm })
  const { data, isAuth } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const onSignInModal = useSignInModal()
  const onSignUpModal = useSignUpModal()

  React.useEffect(() => {
    const scrollHandler = () => {
      if (window.pageYOffset > 0) {
        setStickyNav(true)
      } else {
        setStickyNav(false)
      }
    }
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  const onLogout = () => {
    dispatch(fetchLogout())
  }

  return (
    <React.Fragment>
      <Nav stickyNav={stickyNav}>
        <NavContainer>
          <LeftSection>
            <Logo />
          </LeftSection>
          {!table && (
            <MiddleSection>
              <Navigation />
            </MiddleSection>
          )}

          <RightSection>
            <NavbarIcons />
            {!table &&
              (!isAuth ? (
                <AuthNavigation>
                  <AuthLink onClick={onSignUpModal}>Регистрация</AuthLink>
                  <span style={{ margin: '0 5px' }}>|</span>
                  <AuthLink onClick={onSignInModal}>Войти</AuthLink>
                </AuthNavigation>
              ) : (
                <Flex alignItems='center' margin='0 0 0 20px'>
                  <UserWidget name={data.firstName} role={data.role} onLogout={onLogout} />
                </Flex>
              ))}

            {table && <NavBurger onClick={() => setIsOpen(true)} />}

            {/* {!table && !data && (
              <AuthNavigation>
                <AuthLink>Join Us</AuthLink>
                <span style={{ margin: '0 5px' }}>|</span>
                <AuthLink>Sign In</AuthLink>
              </AuthNavigation>
            )}
            {!table && data && (
              <Flex alignItems='center' margin='0 0 0 20px'>
                <UserIcon />
                <div>
                  <span style={{ fontSize: '16px' }}>{data.firstName}</span>
                </div>
              </Flex>
            )} */}
          </RightSection>
        </NavContainer>
      </Nav>
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} onLogout={onLogout} />
    </React.Fragment>
  )
}

const AuthLink = styled(Span)`
  font-size: 14px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`

const AuthNavigation = styled.div`
  user-select: none;
  margin-left: 20px;
  color: ${({ theme }) => theme.colors.primary};
`

const Nav = styled.header<{ stickyNav: boolean }>`
  position: sticky;
  top: 0;
  z-index: 999;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.borderColor};
  background-color: #fff;
  transition: all 0.4s ease-in-out;
  /* margin-top: -50px; */

  /* ${(props) =>
    props.stickyNav &&
    `
    box-shadow: 0px 3px 8px 1px rgba(34, 60, 80, 0.33);
  `} */
`

const NavContainer = styled(Container)`
  width: 100%;
  height: 50px;

  display: flex;
  align-items: center;
  position: relative;
`

const LeftSection = styled.div`
  height: 100%;
  position: absolute;
  left: 20px;
`

const MiddleSection = styled.nav`
  display: flex;
  height: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`

const RightSection = styled.ul`
  display: flex;
  align-items: center;
  position: absolute;
  right: 20px;
`

const NavBurger = styled(AiOutlineMenu)`
  display: block;
  font-size: 24px;
  color: ${(props) => props.theme.colors.primary};
  margin-left: 20px;
  cursor: pointer;
`
