import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { BiUser, BiShoppingBag, BiSearch } from 'react-icons/bi'
import { MdFavoriteBorder } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'

const IconsData = [
  {
    icon: <BiSearch />,
    path: '/search',
  },
  {
    icon: <MdFavoriteBorder />,
    path: '/favorites',
  },
  {
    icon: <BiShoppingBag />,
    path: '/cart',
  },
]

const NavIcons = styled.li`
  display: flex;
`
const NavIcon = styled(NavLink)`
  display: flex;
  align-items: center;
  font-size: 23px;
  color: ${(props) => props.theme.colors.primary};
  margin-left: 20px;
  transition: all ${(props) => props.theme.transition};
  position: relative;
  &:first-child {
    margin-left: 0;
  }
  &:hover {
    color: ${(props) => props.theme.colors.secondary};
    cursor: pointer;
  }
`

const Counter = styled.span`
  position: absolute;
  bottom: -2px;
  left: -1px;
  background-color: ${({ theme }) => theme.colors.primary};
  width: 12px;
  height: 12px;
  border-radius: 50px;
  color: #fff;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const NavbarIcons: React.FC = () => {
  const { totalCartCount } = useSelector((state: RootState) => state.cart)

  return (
    <NavIcons>
      <NavIcon to='/search'>
        <BiSearch />
      </NavIcon>
      <NavIcon to='/favorites'>
        <MdFavoriteBorder />
      </NavIcon>
      <NavIcon to='/cart'>
        <BiShoppingBag />
        {totalCartCount > 0 && <Counter>{totalCartCount}</Counter>}
      </NavIcon>
    </NavIcons>
  )
}
