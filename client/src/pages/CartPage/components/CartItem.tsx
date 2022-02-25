import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { RouteNames } from '../../../routes'
import { Flex } from '../../../theme'
import { CartCounter } from './CartCounter'

interface ICartItem {
  item: any
  onDelete: (modelId: number, sizeId: number) => void
}

export const CartItem: React.FC<ICartItem> = ({ item, onDelete }) => {
  return (
    <StyledCartItem>
      <CartItemImg>
        <img width={100} height={100} src={item.product_model.image.squarishURL} alt='squarish' />
      </CartItemImg>
      <CartItemContent>
        <Flex justify='space-between'>
          <NavLink to={`${RouteNames.STORE}/${item.product_model.product.url}/${item.product_model.model}`}>
            {item.product_model.product.title}
          </NavLink>
          <span>
            {item.product_model.price.currentPrice.toLocaleString().replace(',', ' ')}{' '}
            {item.product_model.price.currency}
          </span>
        </Flex>
        <p>{item.product_model.product.subtitle}</p>
        <p>Rough Green/Sequoia/Hot Curry/Dark Russet</p>
        <Flex alignItems='center'>
          <CartSize>
            <label>Размер:</label>
            <select name='sizes' id='sizes'>
              {item.product_model.sizes.map((item: any) => (
                <option key={item.id} value={item.size}>
                  {item.size}
                </option>
              ))}
            </select>
          </CartSize>
          <CartCounter quantity={item.quantity} sizeId={item.sizeId} productModelId={item.product_model.id} />
        </Flex>
        <CartItemActions>
          <span>Добавить в избраное</span>
          <span onClick={() => onDelete(item.product_model.id, item.sizeId)}>Удалить</span>
        </CartItemActions>
      </CartItemContent>
    </StyledCartItem>
  )
}

const CartSize = styled.div`
  margin-right: 10px;
  label {
    margin-right: 5px;
  }
`

const CartItemActions = styled.div`
  user-select: none;
  padding-top: 10px;
  span {
    display: inline-block;
    vertical-align: top;
    white-space: nowrap;
    text-align: center;
    text-decoration: none;
    background: 0px 0px;
    cursor: pointer;
    transition: all 0.2s ease 0s;
    box-shadow: 0px -1px 0px 0px inset;
    line-height: 1;
    padding: 4px 0px;
    color: ${({ theme }) => theme.colors.primary};
    &:first-child {
      margin-right: 15px;
    }
    &:hover {
      opacity: 0.75;
    }
  }
`

const CartItemContent = styled.div`
  width: 100%;
  line-height: 1.5;
  a {
    font-size: 16px;
    font-weight: 400;
    color: inherit;
  }
  p,
  label {
    color: ${({ theme }) => theme.colors.secondary};
    padding: 5px 0;
  }
`

const CartItemImg = styled.div`
  width: 100%;
  max-width: 150px;
  max-height: 150px;
  margin-right: 20px;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
`

const StyledCartItem = styled(Flex)`
  padding: 24px 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  &:last-child {
    border-bottom: none;
  }
`
