import React from 'react'
import { CSSTransition } from 'react-transition-group'
import styled, { css } from 'styled-components'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'

import { useHistory } from 'react-router'
import { RouteNames } from '../../../routes'
import { toSemanticUrl } from '../../../utils/toSemanticUrl'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { Flex } from '../../../theme'

interface IProductCart {
  product: any
}

export const ProductCart: React.FC<IProductCart> = ({ product }) => {
  const [currentModel, setCurrentModel] = React.useState(product.models[0])
  console.log('ERROR', product.models)

  const [isHover, setIsHover] = React.useState(false)
  const [favHover, setFavHover] = React.useState(false)
  const history = useHistory()
  const dispatch = useDispatch()

  React.useEffect(() => {
    setCurrentModel(product.models[0])
  }, [product.models])

  // React.useEffect(() => {
  //   let test = productModels.find((item: any) => item.model === currentModel)
  //   setCurrentVariant(test)
  // }, [currentModel, productModels])

  const getSalePercent = (discountPrice: number, fullPrice: number) => {
    return Math.floor(((discountPrice - fullPrice) / fullPrice) * 100)
  }

  const genderChecker = (str: string) => {
    switch (str) {
      case 'men':
        return 'Мужская Обувь'

      case 'women':
        return 'Женская Обувь'

      case 'kids':
        return 'Детская Обувь'
      default:
        return
    }
  }

  const onMouseEnter = () => {
    setIsHover(true)
  }

  return (
    <WrapperProductCart>
      <StyledProductCart
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => {
          setIsHover(false)
          setCurrentModel(product.models[0])
        }}
      >
        <ProductImage notAvailable={!currentModel.inStock}>
          {currentModel.price.discounted && (
            <PercentLabel>
              {getSalePercent(currentModel.price.currentPrice, currentModel.price.fullPrice)}%
            </PercentLabel>
          )}
          {/* <FavoriteLabel onMouseEnter={() => setFavHover(true)} onMouseLeave={() => setFavHover(false)}>
            {favHover ? <MdFavorite /> : <MdFavoriteBorder />}
          </FavoriteLabel> */}
          <img src={currentModel.image.portraitURL} alt='product' />
        </ProductImage>
        <ProductCartInfo>
          <div>
            <CSSTransition unmountOnExit in={isHover} timeout={300} classNames='product-colorways'>
              <ProductColorways>
                {product.models.map(
                  (item: any, inx: number) =>
                    inx < 6 && (
                      <ProductColorwaysItem
                        key={item.id}
                        onMouseEnter={() => {
                          setCurrentModel(item)
                        }}
                      >
                        <Link to={RouteNames.STORE + '/' + product.url + '/' + item.model}>
                          <img alt={'product'} src={item.image.squarishURL} />
                        </Link>
                      </ProductColorwaysItem>
                    )
                )}
                <span>{product.models.length > 6 && `+${product.models.length - 6}`}</span>

                {/* <span>+{product.models.length > 6 ? product.models.length - 6 : product.models.length}</span> */}
                {/* {productModels.map((item: any) => (
                  <ProductColorwaysItem
                    key={'sad' + item.model}
                    onMouseEnter={() => {
                      setCurrentImg('http://localhost:5000/' + item.images[0]?.url)
                    }}
                  >
                    <Link to={RouteNames.STORE + '/' + toSemanticUrl(product.name) + '/' + item.model}>
                      <img alt={'product'} src={'http://localhost:5000/' + item.images[0]?.url} />
                    </Link>
                  </ProductColorwaysItem>
                ))}
                <span>+{restCount}</span> */}
              </ProductColorways>
            </CSSTransition>
          </div>
          <ProductStatus inStock={currentModel.inStock}>
            {currentModel.inStock ? 'Есть в наличии' : 'Нет в наличии'}
          </ProductStatus>
          <span>{product.title}</span>
          <ProductOption>{product.subtitle}</ProductOption>
          <ProductOption>{product.models.length} Цветов</ProductOption>
          <ProductPrice>
            <CurrentPrice>
              {currentModel.price.currentPrice.toLocaleString().replace(',', ' ')} {currentModel.price.currency}
            </CurrentPrice>
            {currentModel.price.discounted && (
              <Discounted isDiscounted={currentModel.price.discounted}>
                {currentModel.price.fullPrice.toLocaleString().replace(',', ' ')} {currentModel.price.currency}
              </Discounted>
            )}
          </ProductPrice>
        </ProductCartInfo>
      </StyledProductCart>
    </WrapperProductCart>
  )
}

const ProductStatus = styled.span<{ inStock?: boolean }>`
  color: ${({ inStock }) => (inStock ? '#44C458' : '#FF4144')};
  font-size: 14px;
  padding: 3px 0;
  transition: none !important;
`

const CurrentPrice = styled.span`
  font-weight: 500;
  font-size: 18px;
`

const Discounted = styled.span<{ isDiscounted: boolean }>`
  color: ${({ isDiscounted }) => isDiscounted && '#FF7D7D'};
  text-decoration: line-through;
  padding-left: 10px;
  font-size: 14px;
`

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
`

const ProductColorwaysItem = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 5px;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    display: block;
  }
`

const ProductColorways = styled.div`
  width: 100%;
  /* background-color: black; */
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  span {
    color: ${({ theme }) => theme.colors.secondary};
    margin-left: 5px;
  }

  &.product-colorways-enter {
    opacity: 0;
    margin-top: -45px;
    /* visibility: hidden; */
  }
  &.product-colorways-enter-active {
    opacity: 1;
    margin-top: 0px;
    /* visibility: visible; */
  }
  &.product-colorways-exit {
    opacity: 1;
    margin-top: 0px;
    /* visibility: visible; */
  }
  &.product-colorways-exit-active {
    opacity: 0;
    margin-top: -45px;
    /* visibility: hidden; */
  }
  &.product-colorways-exit-done {
    opacity: 0;
    margin-top: -45px;
    /* visibility: hidden; */
  }
`

const ProductOption = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
`

const ProductCartInfo = styled.div`
  padding-top: 10px;
  position: relative;
  min-height: 185px;
  display: flex;
  flex-direction: column;
  line-height: 1.75;
  transition: all 0.3s ease-in-out;

  span {
    transition: all 0.3s ease-in-out;
  }
`

const FavoriteLabel = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    font-size: 25px;
    color: ${({ theme }) => theme.colors.primary};
  }
`

const PercentLabel = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: ${({ theme }) => theme.colors.error};
  color: #fff;
  padding: 5px 10px;
  border-radius: 50px;
  font-size: 14px;
`

const ProductImage = styled.div<{ notAvailable: boolean }>`
  position: relative;
  width: 100%;
  z-index: 9;
  img {
    /* max-width: 300px; */
    width: 100%;
    max-height: 357px;
    height: 100%;
    display: block;
    object-fit: cover;
    ${({ notAvailable }) => notAvailable && `opacity: 0.3`}
  }
`

const StyledProductCart = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 16px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  position: relative;
  margin-bottom: 18px;
  /* max-width: 592px; */
  transition: all 0.3s ease-in-out;
`

const WrapperProductCart = styled.div`
  width: 33.3333%;
  display: inline-block;
  position: relative;
  padding-left: 8px;
  padding-right: 8px;
  transition: all 0.3s ease-in-out;
`
