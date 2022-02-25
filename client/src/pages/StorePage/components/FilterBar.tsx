import React from 'react'
import styled, { css } from 'styled-components'
import { Scrollbars } from 'react-custom-scrollbars'
import { Accordion } from '../../../theme/components/Accordion'
import { CSSTransition, Transition } from 'react-transition-group'
import { ScrollBar } from '../../../theme/components/ScrollBar'
import { Checkbox } from '../../../components/Checkbox'
import { useForm } from 'react-hook-form'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import {
  fetchColors,
  fetchProducts,
  IQueryString,
  resetProducts,
  setCat,
  setColor,
  setFilterr,
  setGender,
  setPrice,
  setSize,
} from '../../../store/ducks/product/product-slice'
import ContentLoader from 'react-content-loader'
import { RouteNames } from '../../../routes'
import { useQueryParams, DelimitedNumericArrayParam, withDefault, StringParam } from 'use-query-params'
import { svgToString } from '../../../utils/svgToString'
import { GoCheck } from 'react-icons/go'
import { RcSlider } from '../../../components/RcSlider'

const queryString = require('query-string')

const ProductCategory = [
  {
    title: 'Спортивный стиль',
    path: '/lifestyle',
  },
  {
    title: 'Jordan',
    path: '/jordan',
  },
  {
    title: 'Бег',
    path: '/running',
  },
  {
    title: 'Баскетбол',
    path: '/basketball',
  },
  {
    title: 'Фитнес',
    path: '/fitness',
  },
  {
    title: 'Футбол',
    path: '/soccer',
  },
  {
    title: 'Скейтбординг',
    path: '/football',
  },
  {
    title: 'Бейсбол',
    path: '/baseball',
  },
  {
    title: 'Гольф',
    path: '/golf',
  },
  {
    title: 'Теннис',
    path: '/tennis',
  },
  {
    title: 'Легкая атлетика',
    path: 'track-field',
  },
  {
    title: 'Ходьба',
    path: 'walking',
  },
]

const testArr = [
  {
    id: 1,
    name: 'White',
    color: '#FFF',
  },
  {
    id: 2,
    name: 'Black',
    color: '#000000',
  },
  {
    id: 3,
    name: 'Green',
    color: '#6EFF34',
  },
  {
    id: 4,
    name: 'Blue',
    color: '#2C79FF',
  },
  {
    id: 5,
    name: 'Red',
    color: '#FF1420',
  },
]

const duration = 300

const defaultStyle = {
  transition: `all ${duration}ms ease`,
}

const transitionStyles: any = {
  entering: { marginLeft: 0 },
  entered: { marginLeft: 0 },
  exiting: { marginLeft: '-200px' },
  exited: { marginLeft: '-200px' },
}

export const FilterBar = ({ isOpen }: any) => {
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitSuccessful, isSubmitted },
  } = useForm({
    mode: 'onChange',
  })
  const dispatch = useDispatch()
  const { products, filters, filter } = useSelector((state: RootState) => state.product)
  console.log('products', products)
  const history = useHistory()
  const [title, setTitle] = React.useState('вся обувь')
  // const [filter1, setFilter] = React.useState<IQueryString>({
  //   price: undefined,
  //   gender: undefined,
  //   color: undefined,
  //   cat: undefined,
  //   sortBy: undefined,
  //   size: undefined,
  //   page: undefined,
  // })

  console.log('URL FILTER', filter)

  React.useEffect(() => {
    const parsed = queryString.parse(history.location.search, { arrayFormat: 'comma', parseNumbers: true })

    dispatch(setFilterr(parsed))

    // if (parsed.cat) {
    //   if (!Array.isArray(parsed.cat)) {
    //     dispatch(setCat(parsed.cat))
    //   }
    // }

    // if (parsed.price) {
    //   if (Array.isArray(parsed.price)) {
    //     dispatch(setPrice(parsed.price))
    //   }
    // }

    // if (parsed.color) {
    //   if (!Array.isArray(parsed.color)) {
    //     dispatch(setColor(parsed.color))
    //   } else {
    //     parsed.color.forEach((colorId: number) => {
    //       dispatch(setColor(colorId))
    //     })
    //   }
    // }

    // if (parsed.size) {
    //   if (!Array.isArray(parsed.size)) {
    //     dispatch(setSize(parsed.size))
    //   } else {
    //     parsed.size.forEach((size: number) => {
    //       dispatch(setSize(size))
    //     })
    //   }
    // }
    // if (parsed.color) {
    //   dispatch(setColor(parsed.color))

    //   // if (!Array.isArray(parsed.color)) {
    //   //   setFilter((prev) => ({ ...prev, color: [parsed.color] }))
    //   // } else {
    //   //   setFilter((prev) => ({ ...prev, color: parsed.color }))
    //   // }
    // }

    // if (parsed.gender) {
    //   if (!Array.isArray(parsed.gender)) {
    //     setFilter((prev) => ({ ...prev, gender: [parsed.gender] }))
    //   } else {
    //     setFilter((prev) => ({ ...prev, gender: parsed.gender }))
    //   }
    // }

    // if (parsed.price) {
    //   setFilter((prev) => ({ ...prev, price: parsed.price }))
    // }

    // if (parsed.sortBy) {
    //   setFilter((prev) => ({ ...prev, sortBy: parsed.sortBy }))
    // }

    // if (parsed.page) {
    //   setFilter((prev) => ({ ...prev, page: parsed.page }))
    // }

    // dispatch(fetchProducts(parsed))
  }, [])

  React.useEffect(() => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filter, { arrayFormat: 'comma' }),
    })
    console.log('FILTER ERR', filter)

    dispatch(fetchProducts(filter))
    return () => {
      dispatch(resetProducts())
    }
  }, [dispatch, filter, history])

  const onSelectColor = (colorId: number) => {
    dispatch(setColor(colorId))

    // if (filter1?.color) {
    //   if (filter1?.color.includes(colorId)) {
    //     setFilter((prev) => ({ ...prev, color: prev.color?.filter((item) => item !== colorId) }))
    //   } else {
    //     setFilter((prev: any) => ({ ...prev, color: [...prev.color, colorId] }))
    //   }
    // } else {
    //   setFilter((prev: any) => ({ ...prev, color: [colorId] }))
    // }
  }

  const onSelectCat = (slug: string, cat: string) => {
    dispatch(setCat(slug))
    // if (filter1?.cat) {
    //   if (filter1?.cat === slug) {
    //     return false
    //   } else {
    //     setFilter((prev: any) => ({ ...prev, cat: slug }))
    //     setTitle(cat)
    //   }
    // } else {
    //   setFilter((prev: any) => ({ ...prev, cat: slug }))
    // }
  }

  const onSelectGender = (slug: string) => {
    dispatch(setGender(slug))
    // if (filter1?.gender) {
    //   if (filter1?.gender.includes(slug)) {
    //     setFilter((prev) => ({ ...prev, gender: prev.gender?.filter((item) => item !== slug) }))
    //   } else {
    //     setFilter((prev: any) => ({ ...prev, gender: [...prev.gender, slug] }))
    //   }
    // } else {
    //   setFilter((prev: any) => ({ ...prev, gender: [slug] }))
    // }
  }

  const onSelectPrice = (arr: Array<number>) => {
    dispatch(setPrice(arr))
    // setFilter((prev: any) => ({ ...prev, price: arr }))
  }

  const onSelectSize = (size: string) => {
    dispatch(setSize(size))
  }

  const priceFromFilter = [0, 60000]

  return (
    <CSSTransition in={isOpen} mountOnEnter timeout={300} classNames='filter-bar'>
      <StyledFilterBar>
        <ScrollBar>
          <div>
            <CatNav>
              {filters.categories
                ? filters.categories.map((cat: any) => (
                    <CatLink
                      key={cat.id}
                      isActive={filter.cat === cat.slug}
                      onClick={() => onSelectCat(cat.slug, cat.category)}
                    >
                      {cat.category}
                    </CatLink>
                  ))
                : null}
            </CatNav>

            {priceFromFilter && (
              <Accordion title='Поиск по цене'>
                <>
                  <RcSlider
                    range={priceFromFilter}
                    query={filter.price || priceFromFilter}
                    onSelectPrice={onSelectPrice}
                  />
                </>
              </Accordion>
            )}

            {filters.genders ? (
              <Accordion title={`Пол ${filter.gender && filter.gender.length > 0 ? `(${filter.gender.length})` : ''}`}>
                <>
                  {filters.genders.map((item: any) => (
                    <>
                      <Wrapper>
                        <input
                          id={item.id}
                          type='checkbox'
                          onClick={() => onSelectGender(item.slug)}
                          checked={filter.gender?.includes(item.slug)}
                        />
                        <label htmlFor={item.id}>{item.name}</label>
                      </Wrapper>
                      <br />
                    </>
                  ))}
                </>
              </Accordion>
            ) : null}

            <Accordion title={`Цвет ${filter.color && filter.color.length > 0 ? `(${filter.color.length})` : ''}`}>
              <ColorsFilter>
                {filters.colors
                  ? filters.colors.map((item: any) => (
                      <CircleWrapper key={item.id} onClick={() => onSelectColor(item.id)}>
                        <ColorCircle color={item.color} selected={!!filter.color && filter.color.includes(item.id)} />
                        <span>{item.name}</span>
                      </CircleWrapper>
                    ))
                  : Array(9)
                      .fill(0)
                      .map((_, inx) => (
                        <ContentLoader
                          key={inx}
                          speed={2}
                          width={54}
                          height={48}
                          viewBox='0 0 54 48'
                          backgroundColor='#f3f3f3'
                          foregroundColor='#ecebeb'
                        >
                          <rect x='10' y='205' rx='0' ry='0' width='92' height='9' />
                          <circle cx='24' cy='18' r='17' />
                          <rect x='7' y='42' rx='0' ry='0' width='36' height='5' />
                        </ContentLoader>
                      ))}
              </ColorsFilter>
            </Accordion>

            {filters.sizes ? (
              <Accordion title={`Размер ${filter.size && filter.size.length > 0 ? `(${filter.size.length})` : ''}`}>
                <SizeFilter>
                  {filters.sizes.map((item: any, inx: any) => (
                    <SizeBtn
                      key={inx}
                      selected={!!filter.size && filter.size.includes(item.id)}
                      onClick={() => onSelectSize(item.id)}
                    >
                      {item.size}({item.length})
                    </SizeBtn>
                  ))}
                </SizeFilter>
              </Accordion>
            ) : null}

            <Accordion title='Сезон'>
              <>
                <Checkbox variant='secondary' control={control} name='label' label='Весна-Лето' />
                <br />
                <Checkbox variant='secondary' control={control} name='dsa' label='Осень-Зима' />
              </>
            </Accordion>

            <Accordion title='Поверхность'>
              <>
                <Checkbox variant='secondary' control={control} name='label' label='Искусственный газон' />
                <br />
                <Checkbox variant='secondary' control={control} name='dsa' label='Грунтовый корт' />
                <br />
                <Checkbox variant='secondary' control={control} name='sda' label='Твердый грунт' />
                <br />
                <Checkbox variant='secondary' control={control} name='sda' label='Травяной корт' />
                <br />
                <Checkbox variant='secondary' control={control} name='sda' label='Корт с твердым покрытием' />
                <br />
                <Checkbox variant='secondary' control={control} name='sda' label='Крытый корт' />
                <br />
                <Checkbox variant='secondary' control={control} name='sda' label='Разные покрытия' />
                <br />
                <Checkbox variant='secondary' control={control} name='sda' label='По дороге' />
                <br />
                <Checkbox variant='secondary' control={control} name='sda' label='Мягкий грунт' />
                <br />
                <Checkbox variant='secondary' control={control} name='sda' label='На стадионе' />
                <br />
                <Checkbox variant='secondary' control={control} name='sda' label='По пересеченной местности' />
                <br />
                <Checkbox variant='secondary' control={control} name='sda' label='Газон' />
              </>
            </Accordion>
          </div>
        </ScrollBar>
      </StyledFilterBar>
    </CSSTransition>
  )
}

const SizeBtn = styled.button<{ selected: boolean }>`
  height: 36px;
  text-align: center;
  border: 1px solid rgb(229, 229, 229);
  border-radius: 5px;
  margin-right: 6px;
  margin-bottom: 6px;
  flex: 1 0 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  ${({ selected }) =>
    selected &&
    css`
      border-color: #000;
    `}
  &:hover {
    cursor: pointer;
    border-color: #000;
  }
`

const SizeFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Wrapper = styled.div<{ variant?: 'secondary' }>`
  input {
    appearance: none;
    position: absolute;
    &:checked + label {
      &:before {
        background-repeat: no-repeat;
        background-position: center;
        background-size: 14px;
        background-color: ${({ theme }) => theme.colors.primary};
        background-image: ${`url(${svgToString(GoCheck, { fill: '#fff' })})`};
      }
    }
    &:disabled + label {
      opacity: 0.5;
      &:before {
        cursor: default;
      }
    }
  }
  label {
    display: flex;
    align-items: center;
    line-height: 14px;
    user-select: none;
    cursor: pointer;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.primary};

    &:before {
      content: '';
      display: block;
      min-width: 18px;
      min-height: 18px;
      cursor: pointer;
      border: 1px solid ${({ theme }) => theme.colors.gray};
      border-radius: 3px;
      margin-right: 10px;
    }
  }
`

const CircleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  max-width: 50px;
  span {
    padding-top: 6px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    cursor: pointer;

    span {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`

const ColorCircle = styled.div<{ color: string; selected: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50px;
  background-color: ${({ color }) => color && color};
  box-shadow: 0px 0px 6px -1px rgba(0, 0, 0, 0.25);
  /* border: 1px solid rgb(229, 229, 229); */
  position: relative;
  ${({ selected }) =>
    selected &&
    css`
      &:after {
        content: '';
        display: block;
        width: 8px;
        height: 8px;
        background-color: black;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `}
`

const ColorsFilter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  padding: 10px 0;
`

const CatLink = styled.span<{ isActive: boolean }>`
  margin-bottom: 15px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  ${({ isActive }) =>
    isActive &&
    css`
      text-decoration: underline;
    `}
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    text-decoration: underline;
  }
`

const CatNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 12px;
`

const StyledFilterBar = styled.div`
  transition: all 0.3s ease;
  position: sticky;
  top: 121px;
  min-width: 220px;
  width: 220px;
  height: calc(100vh - 121px);
  margin-right: 20px;

  &.filter-bar-enter {
    opacity: 0;
    margin-left: -240px;
    visibility: hidden;
  }
  &.filter-bar-enter-active {
    opacity: 1;
    margin-left: 0px;
    visibility: visible;
  }
  &.filter-bar-exit {
    opacity: 1;
  }
  &.filter-bar-exit-active {
    opacity: 0;
    margin-left: -240px;
    visibility: hidden;
  }
  &.filter-bar-exit-done {
    opacity: 0;
    margin-left: -240px;
    visibility: hidden;
  }
`
