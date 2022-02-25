import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from '../../../components/Spinner'
import { fetchDeleteCartItem } from '../../../store/ducks/cart/cart-slice'
import { RootState } from '../../../store/rootReducer'
import { CartItem } from './CartItem'

interface ICartProducts {}

export const CartProducts: React.FC = () => {
  const { cartItems, isPending } = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()

  const handleDelete = (modelId: number, sizeId: number) => {
    dispatch(fetchDeleteCartItem({ productModelId: modelId, sizeId }))
  }

  if (isPending) {
    return <Spinner />
  }

  return (
    <div>
      {cartItems.length ? (
        cartItems.map((item: any) => <CartItem item={item} onDelete={handleDelete} key={item.id} />)
      ) : (
        <div style={{ marginTop: 20 }}>Ваша корзина пуста.</div>
      )}
    </div>
  )
}
