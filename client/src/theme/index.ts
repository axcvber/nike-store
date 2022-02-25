import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.breakpoints.xxl};
  margin: 0 auto;
  padding: 0 20px;
`
// const Paragraph = css`
//   font-size: 72px;
//   text-transform: uppercase;
//   font-family: ${(props) => props.theme.fonts.bold};
// `

export const H1 = styled.h1<{ color?: 'white' | 'black' }>`
  line-height: 1.1;
  color: ${({ color, theme }) => {
    switch (color) {
      case 'white':
        return '#fff'
      case 'black':
        return theme.colors.primary
      default:
        return theme.colors.primary
    }
  }};
  font-size: 72px;
  text-transform: uppercase;
  font-family: ${(props) => props.theme.fonts.third};
  font-weight: 700;
  @media screen and (max-width: ${(props) => props.theme.breakpoints.xl}) {
    font-size: 58px;
  }
  @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: 42px;
  }
`

export const H3 = styled.h2<{ color?: 'white' | 'black' }>`
  line-height: 1.2;
  color: ${({ color, theme }) => {
    switch (color) {
      case 'white':
        return '#fff'
      case 'black':
        return theme.colors.primary
      default:
        return 'inherit'
    }
  }};
  font-size: 52px;
  text-transform: uppercase;
  font-family: ${(props) => props.theme.fonts.third};
  font-weight: 700;
  @media screen and (max-width: ${(props) => props.theme.breakpoints.xl}) {
    font-size: 42px;
  }
  @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: 32px;
  }
`

export const P = styled.p<{ color?: 'white' | 'black' }>`
  font-size: 16px;
  line-height: 1.5;
  color: ${({ color, theme }) => {
    switch (color) {
      case 'white':
        return '#fff'
      case 'black':
        return theme.colors.primary
      default:
        return 'inherit'
    }
  }};
`
export const Span = styled.span<{ color?: 'primary' | 'secondary' | 'gray' }>`
  font-size: 12px;
  color: ${({ color, theme }) => {
    switch (color) {
      case 'primary':
        return theme.colors.primary
      case 'secondary':
        return theme.colors.secondary
      case 'gray':
        return theme.colors.gray
      default:
        return 'inherit'
    }
  }};
`

export const Label = styled.label`
  display: block;
  font-size: 12px;
  color: ${(props) => props.theme.colors.secondary};
  padding-top: 10px;
  text-align: center;
`

export const A = styled.a`
  font-size: 12px;
  color: ${(props) => props.theme.colors.secondary};
  text-decoration: underline;
`

export const Title = styled.h1<{ color?: 'white' }>`
  color: ${(props) => (props.color === 'white' ? '#fff' : props.theme.colors.primary)};
  font-size: 72px;
  text-transform: uppercase;
  font-family: ${(props) => props.theme.fonts.third};
  font-weight: 700;
  @media screen and (max-width: ${(props) => props.theme.breakpoints.xl}) {
    font-size: 58px;
  }
  @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: 42px;
  }
`
export const Subtitle = styled.p`
  color: #fff;
  line-height: 1.5;
`
export const ButtonLink = styled(Link)<{ color?: 'white' }>`
  padding: 10px 25px;
  background-color: ${(props) => (props.color === 'white' ? '#fff' : props.theme.colors.primary)};
  color: ${(props) => (props.color === 'white' ? props.theme.colors.primary : '#fff')};
  cursor: pointer;
  display: inline-block;
  border-radius: 50px;
  text-align: center;
  transition: all ${(props) => props.theme.transition};
  &:hover {
    opacity: 0.8;
  }
`
export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 10px 25px;
  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return css`
          background-color: ${({ theme }) => theme.colors.primary};
          color: #fff;
          border: 1px solid transparent;
          &:hover {
            opacity: 0.8;
          }
        `
      default:
        return css`
          background-color: #fff;
          color: ${({ theme }) => theme.colors.primary};
          border: 1px solid ${({ theme }) => theme.colors.gray};
          &:hover {
            border-color: ${({ theme }) => theme.colors.secondary};
          }
        `
    }
  }};

  cursor: pointer;
  display: inline-flex;
  border-radius: 50px;
  text-align: center;
  transition: all ${(props) => props.theme.transition};
`

interface FlexProps {
  direction?: 'column' | 'row' | 'column-reverse' | 'row-reverse'
  justify?: 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-end'
  alignItems?: 'center' | 'flex-end' | 'flex-start' | 'stretch' | 'baseline'
  padding?: string
  margin?: string
}

export const Flex = styled.div<FlexProps>`
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  display: flex;
  flex-direction: ${({ direction }) => {
    switch (direction) {
      case 'column':
        return 'column'
      case 'row':
        return 'row'
      case 'column-reverse':
        return 'column-reverse'
      case 'row-reverse':
        return 'row-reverse'
      default:
        return 'row'
    }
  }};
  justify-content: ${({ justify }) => {
    switch (justify) {
      case 'center':
        return 'center'
      case 'space-between':
        return 'space-between'
      case 'space-around':
        return 'space-around'
      case 'space-evenly':
        return 'space-evenly'

      case 'flex-end':
        return 'flex-end'
      default:
        return 'flex-start'
    }
  }};
  align-items: ${({ alignItems }) => {
    switch (alignItems) {
      case 'center':
        return 'center'
      case 'flex-end':
        return 'flex-end'
      case 'flex-start':
        return 'flex-start'
      case 'stretch':
        return 'stretch'
      case 'baseline':
        return 'baseline'
      default:
        return 'flex-start'
    }
  }};
`
export const Error = styled.span`
  color: ${({ theme }) => theme.colors.error};
  display: block;
  font-size: 12px;
  padding-top: 12px;
`

export const Arrow = styled.div<{ isOpen: boolean; duration?: number; color?: 'secondary' }>`
  position: relative;
  height: 10px;
  width: 10px;
  margin-left: 12px;
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 2px;
    height: 100%;
    transition: all ${({ duration }) => (duration ? duration + 'ms' : 300 + 'ms')} ease-in-out;
    border-radius: 5px;
  }

  &::before {
    left: -3.2px;
    transform: rotate(-45deg);
    background-color: ${({ theme, color }) => (color === 'secondary' ? theme.colors.secondary : theme.colors.primary)};
    ${({ isOpen }) =>
      isOpen &&
      css`
        left: -3.2px;
        transform: rotate(45deg);
      `}
  }
  &::after {
    left: 3.2px;
    transform: rotate(45deg);
    background-color: ${({ theme, color }) => (color === 'secondary' ? theme.colors.secondary : theme.colors.primary)};
    ${({ isOpen }) =>
      isOpen &&
      css`
        left: 3.2px;
        transform: rotate(-45deg);
      `}
  }
`

export const LargeButton = styled.button<{ variant?: 'secondary' }>`
  display: inline-flex;
  white-space: nowrap;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease 0s;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  line-height: 1.5;
  margin-bottom: 12px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 24px;
  border-radius: 30px;
  font-size: 16px;
  span {
    display: flex;
    align-items: flex-start;
  }
  svg {
    margin-left: 5px;
    font-size: 20px;
  }
  &:hover:not([disabled]) {
    background: rgba(0, 0, 0, 0.75);
  }
  &:disabled {
    cursor: default;
  }
  ${({ variant, theme }) =>
    variant === 'secondary' &&
    css`
      color: ${theme.colors.primary};
      background: #fff;
      box-shadow: inset 0 1px 0 0 #ccc, inset -1px 0 0 0 #ccc, inset 0 -1px 0 0 #ccc, inset 1px 0 0 0 #ccc;
      &:hover:not([disabled]) {
        background: #fff;
        box-shadow: inset 0 1.5px 0 0 #ccc, inset -1.5px 0 0 0 #ccc, inset 0 -1.5px 0 0 #ccc, inset 1.5px 0 0 0 #ccc;
      }
      &:disabled {
        cursor: default;
      }
    `}
`
