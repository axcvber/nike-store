import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { fetchProducts, resetProducts } from '../../../store/ducks/product/product-slice'
import { RootState } from '../../../store/rootReducer'
import { ProductCart } from './ProductCart'
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import { Pagination } from '../../../theme/components/Pagination'
import ContentLoader from 'react-content-loader'
const queryString = require('query-string')

//window.location.search.substr(1)
export const ProductsSection = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { products, page } = useSelector((state: RootState) => state.product)
  // const [parsed, setParsed] = React.useState<IQueryString | undefined>()
  console.log('products error', products)

  // React.useEffect(() => {
  //   const query = queryString.parse(history.location.search, { arrayFormat: 'comma', parseNumbers: true })
  //   setParsed(query)
  // }, [history.location.search])

  // React.useEffect(() => {
  //   console.log('PArsed', parsed)

  //   dispatch(fetchProducts(parsed))
  //   return () => {
  //     dispatch(resetProducts())
  //   }
  // }, [dispatch, parsed])

  // React.useEffect(() => {
  //   let query: any = {}

  //   if (page !== 1) query.page = String(page)
  //   console.log('querysuka', query)
  //   history.push({
  //     pathname: '/catalog',
  //     search: queryString.stringify(query),
  //   })
  // }, [history, page])

  return (
    <ProductsWrapper>
      {products
        ? products.map((item: any) => <ProductCart key={item.id} product={item} />)
        : Array(9)
            .fill(0)
            .map((_, inx) => (
              <ContentLoader
                key={inx}
                speed={2}
                width={'33.3333%'}
                height={500}
                viewBox='0 0 33.3333% 500'
                backgroundColor='#f3f3f3'
                foregroundColor='#ecebeb'
              >
                {/* <rect x='138' y='292' rx='0' ry='0' width='92' height='9' />
                <rect x='105' y='6' rx='0' ry='0' width='357' height='357' />
                <rect x='104' y='376' rx='0' ry='0' width='162' height='15' />
                <rect x='104' y='400' rx='0' ry='0' width='200' height='23' />
                <rect x='102' y='436' rx='0' ry='0' width='156' height='21' />
                <rect x='101' y='467' rx='0' ry='0' width='103' height='15' /> */}

                <rect x='138' y='292' rx='0' ry='0' width='92' height='9' />
                <rect x='52' y='377' rx='0' ry='0' width='162' height='15' />
                <rect x='51' y='408' rx='0' ry='0' width='200' height='23' />
                <rect x='51' y='444' rx='0' ry='0' width='156' height='21' />
                <rect x='53' y='483' rx='0' ry='0' width='103' height='15' />
                <rect x='52' y='8' rx='0' ry='0' width='100%' height='357' />
              </ContentLoader>
            ))}

      <Pagination />
    </ProductsWrapper>
  )
}

const ProductsWrapper = styled.div`
  width: 100%;
  display: block;
`
