import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchProduct, resetProduct } from '../../../store/ducks/product/product-slice'
import { RootState } from '../../../store/rootReducer'

type QuizParams = {
  name: string
}

export const ProductAdmin = () => {
  const { oneProduct } = useSelector((state: RootState) => state.product)
  const dispatch = useDispatch()
  const { name } = useParams<QuizParams>()
  console.log('NAME', name)
  console.log('oneProduct', oneProduct)

  React.useEffect(() => {
    // dispatch(fetchProduct(name))
    return () => {
      dispatch(resetProduct())
    }
  }, [dispatch, name])

  if (!oneProduct) {
    return <div>One product is loading...</div>
  }
  return (
    <div>
      <h1>{oneProduct.name}</h1>
      <p>
        Models: <br />
        {oneProduct.variant.map((item: any, inx: any) => (
          <>
            <span>
              <strong>{inx}.</strong>
              {item.title}
            </span>
            <br />
            <span>model:{item.model}</span>
            <br />
            <span>price:{item.price}</span>
            <br />
          </>
        ))}
      </p>
    </div>
  )
}
