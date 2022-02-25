import React from 'react'
import { Dropdown } from '../../../theme/components/Dropdown'
import styled, { css } from 'styled-components'
import { RiFilterOffLine, RiFilterLine } from 'react-icons/ri'
import { Container } from '../../../theme'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { RouteNames } from '../../../routes'
import { removeFilterAttr, setSortBy } from '../../../store/ducks/product/product-slice'
import { GrFormClose } from 'react-icons/gr'
const queryString = require('query-string')

interface IFilterNav {
  isOpenFilterBar: boolean
  onToggleFilterBar: () => void
}

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export const FilterNav: React.FC<IFilterNav> = ({ isOpenFilterBar, onToggleFilterBar }) => {
  const [stickyNav, setStickyNav] = React.useState(false)
  const history = useHistory()
  const { totalCount, filter, filters } = useSelector((state: RootState) => state.product)
  const [title, setTitle] = React.useState('Вся обувь')
  const [sortTitle, setSortTitle] = React.useState<string | undefined>()
  const dispatch = useDispatch()
  // const queryParam = queryString.parse(window.location.search.substr(1))
  // console.log('SUKA', queryParam)

  const parsed = queryString.parse(history.location.search, { arrayFormat: 'comma', parseNumbers: true })

  // React.useEffect(() => {
  //   if (routerQuery.keys()) {
  //     console.log('yes')
  //   }
  //   history.push({
  //     pathname: '/users',
  //     search: queryString.stringify(query),
  //   })
  // }, [routerQuery])

  // console.log('useLocation', useLocation)
  const sortArr = [
    {
      link: 'По умолчанию',
      path: 'ASC',
    },
    {
      link: 'По новизне',
      path: 'DESC',
    },
    {
      link: 'От дорогих к дешевым',
      path: 'priceDesc',
    },
    {
      link: 'От дешевых к дорогим',
      path: 'priceAsc',
    },
  ]

  React.useEffect(() => {
    if (filters.categories && filter.cat) {
      const title = filters.categories.find((item: any) => filter.cat === item.slug)
      setTitle(title.category)
    }
  }, [filters.categories, filter.cat])

  React.useEffect(() => {
    if (filter.sortBy) {
      const title = sortArr.find((item: any) => filter.sortBy === item.path)
      setSortTitle(title?.link)
    }
  }, [filter.sortBy])

  React.useEffect(() => {
    const scrollHandler = () => {
      if (window.pageYOffset > 0) {
        setStickyNav(true)
      } else {
        setStickyNav(false)
      }
    }
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  const onSelectSort = (path: string) => {
    dispatch(setSortBy(path))
  }

  return (
    <WrapperFilterNav>
      <StyledFilterNav>
        <LeftFilterNav>
          <FilterTitle stickyNav={stickyNav}>
            <h1>{title}</h1>&nbsp;<span>{totalCount != null && `(${totalCount})`}</span>
          </FilterTitle>
          <FilterAttr>
            {filter.price ? (
              <RemoveFilterAttr>
                <span>{`${filter.price[0]}-${filter.price[1]}`}</span>
                <GrFormClose />
              </RemoveFilterAttr>
            ) : null}
            {filters.genders && filter.gender
              ? filters.genders
                  .filter((item: any) => filter.gender.includes(item.slug))
                  .map((item: any) => (
                    <RemoveFilterAttr>
                      <span>{item.name}</span>
                      <GrFormClose />
                    </RemoveFilterAttr>
                  ))
              : null}

            {/* {filter.gender &&
              filter.gender.map((item: any) => (
                <RemoveFilterAttr>
                  <span>{item}</span>
                  <GrFormClose />
                </RemoveFilterAttr>
              ))} */}

            {filters.colors && filter.color
              ? filters.colors
                  .filter((item: any) => filter.color.includes(item.id))
                  .map((item: any) => (
                    <RemoveFilterAttr>
                      <span>{item.name}</span>
                      <GrFormClose />
                    </RemoveFilterAttr>
                  ))
              : null}
            {filters.sizes && filter.size
              ? filters.sizes
                  .filter((item: any) => filter.size.includes(item.id))
                  .map((item: any) => (
                    <RemoveFilterAttr>
                      <span>
                        {item.size}({item.length})
                      </span>
                      <GrFormClose />
                    </RemoveFilterAttr>
                  ))
              : null}
            {filter && <ClearAttr onClick={() => dispatch(removeFilterAttr())}>Очистить все</ClearAttr>}

            {/* {filter.color &&
              filter.color.map((item: any) => (
                <RemoveFilterAttr onClick={() => dispatch(removeFilterAttr(item))}>
                  <span>{item}</span>
                  <GrFormClose />
                </RemoveFilterAttr>
              ))} */}
          </FilterAttr>
          <div>{/* {filters.colors && filters.colors.filter((item: any) => !filter.color.includes(item))} */}</div>
        </LeftFilterNav>

        <FilterRightSection>
          <FilterState onClick={onToggleFilterBar}>
            <span>{isOpenFilterBar ? 'Скрыть Фильтры' : 'Показать Фильтры'}</span>
            {isOpenFilterBar ? <RiFilterOffLine /> : <RiFilterLine />}
          </FilterState>

          <Dropdown title={sortTitle || 'Сортировать'}>
            <SortNav>
              {sortArr.map((item) => (
                <span onClick={() => onSelectSort(item.path)}>{item.link}</span>
              ))}
            </SortNav>
          </Dropdown>
        </FilterRightSection>
      </StyledFilterNav>
    </WrapperFilterNav>
  )
}

const ClearAttr = styled.span`
  font-size: 14px;
  text-decoration: underline;
  transition: color 0.1s ease;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.secondary};
  }
`

const FilterAttr = styled.div`
  display: flex;
  align-items: center;
  margin: 0 20px;
  flex-wrap: wrap;
  max-width: 700px;
`

const LeftFilterNav = styled.div`
  display: flex;
  align-items: center;
`

const RemoveFilterAttr = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: 3px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: transparent;
  border-radius: 3px;
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
  span {
    font-size: 12px;
    line-height: 1;
    color: ${({ theme }) => theme.colors.primary};
  }
  svg {
    path {
      stroke: ${({ theme }) => theme.colors.primary};
    }
    font-size: 14px;
    margin-left: 3px;
    margin-right: -3px;
  }
`

const SortNav = styled.ul`
  /* background-color: red; */
  span {
    display: inline-block;
    font-size: 15px;
    margin-bottom: 8px;
    color: #000;
    cursor: pointer;
    &:last-child {
      margin-bottom: 0px;
    }
  }
`

const FilterRightSection = styled.div`
  display: flex;
  align-items: center;
`

const FilterTitle = styled.div<{ stickyNav: boolean }>`
  display: flex;
  align-items: center;
  h1,
  span {
    transition: all 0.3s ease;
    font-weight: 400;
    font-size: ${({ stickyNav }) => (stickyNav ? '20px' : '24px')};
  }
`

const FilterState = styled.div`
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 25px;
  span {
    padding-right: 5px;
  }
  svg {
    font-size: 18px;
  }
`

const StyledFilterNav = styled(Container)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.primary};
  height: 100%;
`

const WrapperFilterNav = styled.header`
  position: sticky;
  top: 51px;
  left: 0;
  z-index: 99;
  height: 70px;
  /* background-color: ${({ theme }) => theme.colors.bg.primary}; */
  background-color: #fff;
`
