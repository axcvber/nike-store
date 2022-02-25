import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, Switch, Route, useHistory } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { fetchDeleteProduct, fetchProducts, resetProducts } from '../../../store/ducks/product/product-slice'
import { RootState } from '../../../store/rootReducer'
import { AdminModal } from './AdminModal'
import { Categories } from './Categories'
import { NewProduct } from './NewProduct'
import { Table } from './Table'
import { Types } from './Types'
import { IoMdAdd } from 'react-icons/io'
import { Colors } from './Colors'

export const Products = () => {
  const { products, isPending } = useSelector((state: RootState) => state.product)
  const dispatch = useDispatch()
  const history = useHistory()
  const location = history.location.pathname
  var n = location.lastIndexOf('/')
  var result = location.substring(n + 1)
  console.log(result)
  const [isOpenModal, setIsOpenModal] = React.useState<string | null>(null)

  // React.useEffect(() => {
  //   dispatch(fetchProducts())
  //   return () => {
  //     dispatch(resetProducts())
  //   }
  // }, [dispatch])

  const handleDelete = (selected: any) => {
    dispatch(fetchDeleteProduct(selected))
  }

  const handleCloseModal = (): void => {
    setIsOpenModal(null)
  }

  if (!products) {
    return null
  }

  const arrKeys = ['ID', 'Name', 'Price', 'Created', 'Type', 'Category', 'Models']

  return (
    <StyledProducts>
      {isPending && <div>isPending</div>}
      <AdminHeader>
        <h3>{result[0].toUpperCase() + result.slice(1)}</h3>
        <AddButton onClick={() => setIsOpenModal(result)}>
          <IoMdAdd />
        </AddButton>
      </AdminHeader>
      <Tabs>
        <NavLink exact to='/admin/products' activeClassName={'active'}>
          All
        </NavLink>
        <NavLink exact to='/admin/products/types' activeClassName={'active'}>
          Types
        </NavLink>
        <NavLink exact to='/admin/products/categories' activeClassName={'active'}>
          Categories
        </NavLink>
        <NavLink exact to='/admin/products/colors' activeClassName={'active'}>
          Colors
        </NavLink>
      </Tabs>
      <Switch>
        <Route exact path='/admin/products'>
          <>
            <Table arrKeys={arrKeys} items={products} handleDelete={handleDelete} />
            <AdminModal open={isOpenModal === 'products'} onClose={handleCloseModal}>
              <NewProduct />
            </AdminModal>
          </>
        </Route>
        <Route path='/admin/products/types'>
          <>
            <Types />
            <AdminModal open={isOpenModal === 'types'} onClose={handleCloseModal}>
              <h1>types</h1>
            </AdminModal>
          </>
        </Route>
        <Route path='/admin/products/categories'>
          <>
            <Categories />
            <AdminModal open={isOpenModal === 'categories'} onClose={handleCloseModal}>
              <h1>Categories</h1>
            </AdminModal>
          </>
        </Route>
        <Route path='/admin/products/colors'>
          <Colors isOpenModal={isOpenModal === 'colors'} onCloseModal={handleCloseModal} />
        </Route>
      </Switch>
    </StyledProducts>
  )
}

const AddButton = styled.button`
  padding: 8px;
  border: none;
  border-radius: 7px;
  background-color: #5629ee;
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    font-size: 22px;
    color: #fdfeff;
  }
`

const AdminHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  background-color: #171c28;
  align-items: center;
  padding: 20px 0;
  color: #fdfeff;
`

const Tabs = styled.div`
  height: 30px;
  display: flex;
  margin-bottom: 10px;
  a {
    height: 100%;
    color: #fdfeff;
    padding: 0 10px;
    margin-right: 15px;
    &.active {
      border-bottom: 2px solid #5629ed;
    }
  }
`

const StyledProducts = styled.section`
  width: 100%;
  padding: 30px;
`
