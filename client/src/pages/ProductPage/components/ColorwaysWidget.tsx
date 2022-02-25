import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { RouteNames } from '../../../routes'
import { fetchColorsWays } from '../../../store/ducks/product/product-slice'
import { RootState } from '../../../store/rootReducer'

interface IColorwaysWidget {
  productURL: string
  currentModel: string
}

export const ColorwaysWidget: React.FC<IColorwaysWidget> = ({ productURL, currentModel }) => {
  const { colorways } = useSelector((state: RootState) => state.product)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchColorsWays(productURL))
  }, [dispatch, productURL])

  if (!colorways) {
    return null
  }

  return (
    <RightBarColorways>
      {colorways.map((item: any) => (
        <NavLink key={item.id} to={RouteNames.STORE + '/' + productURL + '/' + item.model}>
          <ColorwayImage isActive={item.model === currentModel} src={item.image.squarishURL} alt='sneaker' />
        </NavLink>
      ))}
      {/* {oneProduct.modelList.map((item: any) => (
      <NavLink key={item.model} to={item.model}>
        <ColorwayImage
          isActive={item.model === oneProduct.product.models[0].model}
          src={'http://localhost:5000/' + item.images[0].url}
          alt='sneaker'
        />
      </NavLink>
    ))} */}
    </RightBarColorways>
  )
}

const ColorwayImage = styled.img<{ isActive: boolean }>`
  max-width: 69px;
  width: 100%;
  height: 69px;
  border-radius: 4px;
  &:hover {
    border: 1px solid rgb(17, 17, 17);
  }
  ${({ isActive }) =>
    isActive &&
    css`
      border: 1px solid rgb(17, 17, 17);
    `}
`

const RightBarColorways = styled.div`
  a {
    margin-right: 5px;
    line-height: 1.3;
  }
`
