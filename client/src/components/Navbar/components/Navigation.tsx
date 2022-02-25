import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { NavbarData } from '../navLinks'

const StyledNavMenu = styled.ul`
  display: flex;
`
export const NavItem = styled.li`
  margin-right: 30px;
  &:last-child {
    margin-right: 0;
  }
`
export const NavRef = styled(NavLink)`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-weight: 400;
  height: 100%;
  border-bottom: 2px solid transparent;
  transition: all ${(props) => props.theme.transition};

  &:hover,
  &.${(props) => props.activeClassName} {
    color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }
`

export const Navigation = () => {
  return (
    <StyledNavMenu>
      {NavbarData.map((item) => (
        <NavItem>
          <NavRef activeClassName='any' to={item.path} exact>
            {item.title}
          </NavRef>
        </NavItem>
      ))}
    </StyledNavMenu>
  )
}
