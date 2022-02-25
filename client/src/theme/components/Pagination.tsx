import React from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { setPage } from '../../store/ducks/product/product-slice'
import { RootState } from '../../store/rootReducer'
import { GrPrevious, GrNext } from 'react-icons/gr'
import { useHistory } from 'react-router'
const queryString = require('query-string')

export const Pagination = () => {
  const { currentPage, filter, totalPages } = useSelector((state: RootState) => state.product)
  const dispatch = useDispatch()
  const history = useHistory()
  console.log('totalPages', totalPages)
  console.log('currentPage', currentPage)

  React.useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }, [currentPage])

  const handlePageClick = (event: any) => {
    const newOffset = event.selected + 1
    console.log('currentPage', currentPage)

    if (newOffset <= 1) {
      dispatch(setPage(undefined))
    } else {
      dispatch(setPage(newOffset))
    }

    console.log(`User requested page number ${event.selected}, which is offset`)
  }
  if (totalPages <= 1) {
    return null
  }

  return (
    <StyledPagination>
      <MyPaginate
        // disableInitialCallback={true}
        pageCount={totalPages}
        breakLabel='...'
        nextLabel={<GrNext />}
        previousLabel={<GrPrevious />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={8}
        marginPagesDisplayed={1}
        activeClassName='active'
        forcePage={currentPage - 1}
      />
      {/* {pages.map((item) => (
        <PaginationItem key={item} isActive={currentPage === item} onClick={() => dispatch(setPage(item))}>
          {item}
        </PaginationItem>
      ))} */}
    </StyledPagination>
  )
}

//refactor needed

const MyPaginate = styled(ReactPaginate)`
  display: flex;
  li a {
    user-select: none;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.bg.primary};
    margin-right: 10px;
    padding: 10px 15px;
    cursor: pointer;
    border: 1.8px solid transparent;
    border-radius: 5px;
    display: flex;
    align-items: center;
    transition: all 0.1s ease;
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      background-color: transparent;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }

  li.previous a,
  li.next a {
    background-color: ${({ theme }) => theme.colors.primary};
    padding: 10px 30px;
    svg polyline {
      stroke: #fff;
    }
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      background-color: transparent;
      border-color: ${({ theme }) => theme.colors.primary};
      svg polyline {
        stroke: ${({ theme }) => theme.colors.primary};
      }
    }
  }
  li.next a {
    margin-right: 0;
  }
  li.active a {
    color: ${({ theme }) => theme.colors.primary};
    background-color: transparent;
    border-color: ${({ theme }) => theme.colors.primary};
  }
  li.disabled a {
    background-color: ${({ theme }) => theme.colors.bg.secondary};
    svg polyline {
      stroke: ${({ theme }) => theme.colors.secondary};
    }
  }
  li.disable,
  li.disabled a {
    cursor: default;
    &:hover {
      background-color: ${({ theme }) => theme.colors.bg.secondary};
      border-color: transparent;
      svg polyline {
        stroke: ${({ theme }) => theme.colors.secondary};
      }
    }
  }
`

const PaginationItem = styled.div<{ isActive: boolean }>`
  margin-right: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.bg.primary};

  ${({ isActive }) =>
    isActive &&
    css`
      color: #000;
      background-color: ${({ theme }) => theme.colors.bg.secondary};
    `}
`

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`
