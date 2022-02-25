import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartItems, resetCartItems } from '../../store/ducks/cart/cart-slice'
import { RootState } from '../../store/rootReducer'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { Container, Flex, LargeButton } from '../../theme'
import 'rc-tooltip/assets/bootstrap.css'
import { CartProducts } from './components/CartProducts'

const CartPage = () => {
  const { totalPrice, cartItems } = useSelector((state: RootState) => state.cart)

  const dispatch = useDispatch()
  const history = useHistory()

  React.useEffect(() => {
    dispatch(fetchCartItems())
    return () => {
      dispatch(resetCartItems())
    }
  }, [dispatch])

  const checkoutHandler = () => {
    history.push('/checkout')
  }

  return (
    <CartContainer>
      <CartContent>
        <Title>Корзина</Title>
        <CartProducts />
      </CartContent>
      <CartSidebar>
        <h4>Ваш заказ</h4>
        <CartSidebarItem justify='space-between'>
          <p>Сумма заказа</p>
          <span>{totalPrice.toLocaleString().replace(',', ' ')} грн</span>
        </CartSidebarItem>
        <CartSidebarItem justify='space-between'>
          <p>Скидка</p>
          <span>—</span>
        </CartSidebarItem>

        <TotalItem justify='space-between'>
          <p>Итого</p>
          <span>{totalPrice.toLocaleString().replace(',', ' ')} грн</span>
        </TotalItem>

        <Flex padding='20px 0'>
          <LargeButton onClick={checkoutHandler}>Оформить заказ</LargeButton>
        </Flex>
      </CartSidebar>
    </CartContainer>
  )
}

const TotalItem = styled(Flex)`
  margin: 12px 0;
  padding: 16px 0px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  span {
    font-family: ${({ theme }) => theme.fonts.third};
    font-weight: 500;
    font-size: 14px;
  }
`

const CartSidebarItem = styled(Flex)`
  padding: 12px 0;
  span {
    font-size: 15px;
  }
`

const CartSidebar = styled.div`
  position: sticky;
  top: 91px;
  height: 100%;
  padding: 0 10px;
  h4 {
    font-size: 22px;
    line-height: 1.5;
    font-weight: 400;
    margin-bottom: 10px;
  }
  width: 30%;
  /* background-color: black; */
`

const Title = styled.h3`
  font-size: 22px;
  font-weight: 400;
`

const CartContent = styled.div`
  padding: 0 10px;
  width: 70%;
  margin-right: 40px;
`

const CartContainer = styled(Container)`
  margin: 40px auto;
  display: flex;
  max-width: ${(props) => props.theme.breakpoints.xl};
`

export default CartPage
