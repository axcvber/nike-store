import React from 'react'
import styled, { css } from 'styled-components'
import { AiFillDashboard, AiFillDatabase, AiFillHome, AiFillGold, AiFillAppstore } from 'react-icons/ai'
import { FaClipboardList, FaSitemap } from 'react-icons/fa'
import { HiUsers } from 'react-icons/hi'
import { MdRateReview } from 'react-icons/md'
import { IoSettingsSharp } from 'react-icons/io5'
import { Dashboard } from './components/Dashboard'
import { Switch, Route, NavLink } from 'react-router-dom'
import NotFoundPage from '../NotFoundPage'
import { Users } from './components/Users'
import { Products } from './components/Products'
import { Orders } from './components/Orders'
import { Reviews } from './components/Reviews'
import { Settings } from './components/Settings'
import { ProductAdmin } from './components/ProductAdmin'
import { NewProduct } from './components/NewProduct'
import { Types } from './components/Types'
import { Categories } from './components/Categories'

const adminNav = [
  {
    title: 'Home',
    icon: <AiFillHome />,
    exact: true,
    path: '/',
  },
  {
    title: 'Dashboard',
    icon: <AiFillDashboard />,
    exact: true,
    path: '/admin',
  },
  {
    title: 'Products',
    icon: <AiFillDatabase />,
    exact: false,
    path: '/admin/products',
  },
  {
    title: 'Users',
    icon: <HiUsers />,
    exact: true,
    path: '/admin/users',
  },
  {
    title: 'Orders',
    icon: <FaClipboardList />,
    exact: true,
    path: '/admin/orders',
  },
  {
    title: 'Reviews',
    icon: <MdRateReview />,
    exact: true,
    path: '/admin/reviews',
  },
  {
    title: 'Settings',
    icon: <IoSettingsSharp />,
    exact: true,
    path: '/admin/settings',
  },
]

const routes = [
  {
    path: '/admin',
    exact: true,
    main: () => <Dashboard />,
  },
  {
    path: '/admin/products',
    exact: false,
    main: () => <Products />,
  },
  {
    path: '/admin/products/:name?',
    exact: true,
    main: () => <ProductAdmin />,
  },
  {
    path: '/admin/add-product',
    exact: true,
    main: () => <NewProduct />,
  },
  {
    path: '/admin/users',
    exact: true,
    main: () => <Users />,
  },
  {
    path: '/admin/orders',
    exact: true,
    main: () => <Orders />,
  },
  {
    path: '/admin/reviews',
    exact: true,
    main: () => <Reviews />,
  },
  {
    path: '/admin/settings',
    exact: true,
    main: () => <Settings />,
  },
]

export const AdminPage = () => {
  return (
    <AdminWrapper>
      <AdminBar>
        <AdminBarLinks>
          {adminNav.map((item, inx) => (
            <li key={inx}>
              <NavLink exact={item.exact} to={item.path} activeClassName={'active'}>
                {item.icon}
                {item.title}
              </NavLink>
            </li>
          ))}
        </AdminBarLinks>
      </AdminBar>

      <Switch>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} exact={route.exact} children={route.main} />
        ))}
        <Route path='*' component={NotFoundPage} />
      </Switch>
    </AdminWrapper>
  )
}

const AdminBarLinks = styled.ul`
  /* background-color: red; */
  li {
    padding: 15px 0;
  }
  a {
    width: 100%;
    color: #7a808f;
    display: flex;
    align-items: center;
    &.active {
      border-radius: 5px;
      color: #fdfeff;
      svg {
        color: #5629ed;
      }
    }
  }
  svg {
    font-size: 18px;
    margin-right: 15px;
  }
`

const AdminBar = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 250px;
  width: 250px;
  min-height: 100vh;
  height: 100%;
  background-color: #121621;
  color: #dadee3;
  padding: 20px;
`

const AdminWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #171c28;
  display: flex;
`
