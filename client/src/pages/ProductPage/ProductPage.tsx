import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchModels, fetchProduct, resetProduct } from '../../store/ducks/product/product-slice'
import { RootState } from '../../store/rootReducer'
import { NavLink, useParams } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { addToCart } from '../../store/ducks/cart/cart-slice'
import { Container, Flex, LargeButton } from '../../theme'
import { MdFavoriteBorder } from 'react-icons/md'
import { Accordion } from '../../theme/components/Accordion'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { SuggestSlider } from './components/SuggestSlider'
import { ColorwaysWidget } from './components/ColorwaysWidget'
import { useHistory } from 'react-router-dom'
import { Spinner } from '../../components/Spinner'
import { SubmitHandler, useController, useForm } from 'react-hook-form'

export interface ProductPageParams {
  url: string
  model: string
}

export interface ISizeFormState {
  sizeId: number
}

export const SizeFormState = {
  sizeId: undefined,
}

const ProductPage = () => {
  const { product, productModel, models } = useSelector((state: RootState) => state.product)
  const { cartItems, isPending } = useSelector((state: RootState) => state.cart)
  const history = useHistory()
  const dispatch = useDispatch()
  const { url, model } = useParams<ProductPageParams>()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { isSubmitSuccessful, isSubmitted, errors },
  } = useForm<ISizeFormState>({
    mode: 'onChange',
    // defaultValues: SizeFormState,
    // resolver: yupResolver(merged),
  })

  React.useEffect(() => {
    dispatch(fetchProduct({ url, model }))
    return () => {
      dispatch(resetProduct())
    }
  }, [dispatch, url, model])

  // React.useEffect(() => {
  //   if (oneProduct) {
  //     dispatch(fetchModels(oneProduct.id))
  //   }
  // }, [dispatch, oneProduct])

  const onSubmit: SubmitHandler<ISizeFormState> = ({ sizeId }) => {
    dispatch(
      addToCart({
        productModelId: productModel.id,
        sizeId,
      })
    )
    console.log('addedToBag', {
      productModelId: productModel.id,
      sizeId,
    })
  }

  if (!product || !productModel) {
    return <div>One product is loading...</div>
  }
  return (
    <ProductPageContainer>
      <Flex>
        <Content>
          <ContentImages>
            {/* <img src={'http://localhost:5000/' + oneProduct.product.models[0].images[0].url} alt='product' /> */}

            {productModel.gallery.map((item: any) => (
              <Zoom key={item.id} overlayBgColorEnd={'rgba(0, 0, 0, 0.9)'}>
                <ContentImage>
                  <img src={item.url} alt={`model${item.id}}`} />
                </ContentImage>
              </Zoom>
            ))}
          </ContentImages>
        </Content>
        <RightBar>
          <RightBarHeader>
            <h1>{product.title}</h1>
            <h2>{product.subtitle}</h2>
            <span>
              {productModel.price.currentPrice.toLocaleString().replace(',', ' ')}&nbsp;{productModel.price.currency}
            </span>
            {productModel.price.discounted && (
              <span>
                {productModel.price.fullPrice.toLocaleString().replace(',', ' ')} {productModel.price.currency}
              </span>
            )}
            {/* <span>Color: {oneProduct.product.models[0].color.name}</span> */}
          </RightBarHeader>
          <ColorwaysWidget currentModel={productModel.model} productURL={url} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <RightBarSize isError={!!errors.sizeId}>
              <span>Выберите размер</span>
              <RightBarSizeTable {...register('sizeId', { required: true })}>
                {productModel.sizes.map((item: any) => (
                  <div key={item.id}>
                    <input
                      onClick={() => setValue('sizeId', item.id, { shouldValidate: true })}
                      id={item.id}
                      type='radio'
                      name='size'
                      disabled={!item.product_model_size.isAvailable}
                    />
                    <label htmlFor={item.id}>{item.size}</label>
                  </div>
                ))}
              </RightBarSizeTable>
            </RightBarSize>
            <Flex direction='column' margin='30px 0 '>
              <LargeButton type='submit' disabled={isPending}>
                {isPending ? <Spinner width={5} height={20} color={'#fff'} radius={0} /> : 'Добавить в корзину'}
              </LargeButton>

              <LargeButton variant='secondary'>
                <span>
                  Список желаний
                  <MdFavoriteBorder />
                </span>
              </LargeButton>
            </Flex>
          </form>

          <AboutProduct>
            <p>{product.Info.description}</p>
            <ul>
              <li>
                Цвет:
                {productModel.colors.map((item: any) => (
                  <span> {item.name}</span>
                ))}
              </li>
              <li>Модель: {productModel.model}</li>
            </ul>
            <button>Подробнее о товаре</button>

            <RightBarAcc>
              <Accordion title='Бесплатная доставка и возврат' defaultOpen={false} size='large'>
                <div>Бесплатная стандартная доставка при заказе на сумму от 7 500 pyб</div>
              </Accordion>

              <Accordion title='Отзывы (0)' withBorder={true} defaultOpen={false} size='large'>
                <div>Поделись своим мнением. Оставь первый отзыв о Nike Air Max Invigor Print. Оставить отзыв</div>
              </Accordion>
            </RightBarAcc>
          </AboutProduct>
        </RightBar>
      </Flex>
      <ProductsPageSlider>
        <h3>You Might Also Like</h3>
        <SuggestSlider />
      </ProductsPageSlider>
    </ProductPageContainer>
  )
}

const ProductsPageSlider = styled.div`
  width: 100%;
  /* background-color: black; */
  h3 {
    padding-bottom: 16px;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 500;
    font-family: ${({ theme }) => theme.fonts.third};
    /* text-align: left; */
  }
`

const AboutProduct = styled.div`
  ul {
    padding-top: 30px;
    padding-bottom: 20px;

    li {
      list-style-type: disc;
      margin-left: 16px;
      margin-bottom: 10px;
    }
  }
  button {
    transition: all 0.2s ease 0s;
    cursor: pointer;
    background-color: transparent;
    box-shadow: inset 0 -1px 0 0 #111;
    padding-bottom: 2px;
    &:hover {
      opacity: 1;
      box-shadow: inset 0 -1.5px 0 0 #111;
    }
  }
`

const RightBarAcc = styled.div`
  margin-top: 30px;
`

const RightBarSizeTable = styled.div`
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 7px;
  input {
    position: absolute !important;
    height: 0px;
    width: 0px;
    overflow: hidden;
    &:not(:disabled) + label:hover {
      box-shadow: rgb(17 17 17) 0px 0px 0px 1px inset;
    }
    &:checked + label {
      box-shadow: rgb(17 17 17) 0px 0px 0px 1px inset;
    }
    &:disabled + label {
      cursor: default;
      color: rgb(221, 221, 221);
      background: rgb(247, 247, 247);
      border: none;
    }
  }
  label {
    cursor: pointer;
    background: rgb(255, 255, 255);
    color: rgb(17, 17, 17);
    box-shadow: rgb(229 229 229) 0px 0px 0px 1px;
    height: 48px;
    border-radius: 4px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const RightBarSize = styled.div<{ isError: boolean }>`
  margin-top: 32px;
  span {
    color: ${({ isError }) => isError && 'red'};
  }
`

const RightBarHeader = styled.div`
  h1 {
    font-size: 28px;
    font-weight: 400;
    padding-bottom: 5px;
  }
  h2 {
    font-weight: 400;
    font-size: 16px;
    padding-bottom: 20px;
  }
  margin-bottom: 12px;
`

const ContentImage = styled.div`
  /* width: 100%;
  max-width: 365px; */
  background-color: red;

  img {
    max-width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

const ContentImages = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  /* background-color: blue; */
`

const Content = styled.div`
  width: 100%;
  margin-right: 40px;
`

const RightBar = styled.div`
  width: 100%;
  max-width: 380px;
  /* padding: 0 20px; */
`

const ProductPageContainer = styled(Container)`
  margin: 40px auto;
  max-width: ${(props) => props.theme.breakpoints.xl};
`

export default ProductPage
