import React from 'react'
import styled from 'styled-components'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { changeCount } from '../../../store/ducks/cart/cart-slice'

export interface ICartCounter {
  quantity: number
  productModelId: number
  sizeId: number
}

export const CartCounter: React.FC<ICartCounter> = ({ quantity, productModelId, sizeId }) => {
  const [count, setCount] = React.useState<number>(quantity)
  const dispatch = useDispatch()

  React.useEffect(() => {
    setCount(quantity)
  }, [quantity])

  const onAddCount = () => {
    dispatch(
      changeCount({
        quantity: count + 1,
        productModelId,
        sizeId,
      })
    )
  }

  const onRemoveCount = () => {
    dispatch(
      changeCount({
        quantity: count - 1,
        productModelId,
        sizeId,
      })
    )
  }

  return (
    <StyledCartCounter>
      <label>Количество:</label>
      <button onClick={onRemoveCount}>
        <AiOutlineMinus />
      </button>
      <input type='text' value={count} />
      <button onClick={onAddCount}>
        <AiOutlinePlus />
      </button>
    </StyledCartCounter>
  )
}

const StyledCartCounter = styled.div`
  display: flex;
  align-items: center;
  label {
    margin-right: 10px;
  }
  input {
    width: 40px;
    height: 30px;
    margin: 0 10px;
    text-align: center;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    cursor: pointer;
    svg {
      font-size: 18px;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`
