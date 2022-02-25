import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../image/icons/nikeorig.png'
const StyledLogoLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
  img {
    height: auto;
    transition: opacity ${(props) => props.theme.transition};
    &:hover {
      opacity: 0.6;
    }
  }
`
const StyledLogo = styled.div`
  display: flex;
  align-items: center;
`

interface LogoProps {
  color?: string
  link?: boolean
  width?: number
  height?: number
}

export const Logo: React.FC<LogoProps> = ({ color, link = true, width, height }) => {
  return (
    <>
      {link ? (
        <StyledLogoLink to='/'>
          <img src={logo} alt='logo' />
        </StyledLogoLink>
      ) : (
        <StyledLogo>
          <img src={logo} alt='logo' />
        </StyledLogo>
      )}
    </>
  )
}
