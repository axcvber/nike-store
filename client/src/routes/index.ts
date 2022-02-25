import { ComponentType, lazy, LazyExoticComponent } from 'react'

export interface IRoute {
  path: string
  component: LazyExoticComponent<ComponentType>
  exact?: boolean
}

export enum RouteNames {
  HOME = '/',
  STORE = '/catalog',
  PRODUCT = '/product',
  CONTACTS = '/contacts',
  SALE = '/sale',
  SEARCH = '/search',
  FAVORITES = '/favorites',
  CART = '/cart',
  LOGIN = '/login',
  RESET = '/reset',
  PROFILE = '/profile',
  ADMIN = '/admin',
  CHECKOUT = '/checkout',
}

export const publicRoutes: IRoute[] = [
  {
    path: RouteNames.HOME,
    component: lazy(() => import('../pages/HomePage/HomePage')),
    exact: true,
  },
  {
    path: RouteNames.STORE,
    component: lazy(() => import('../pages/StorePage/StorePage')),
    exact: true,
  },
  // {
  //   path: RouteNames.STORE + '/:slug?',
  //   component: lazy(() => import('../pages/StorePage/StorePage')),
  //   exact: true,
  // },
  {
    path: RouteNames.STORE + '/:url/:model?',
    component: lazy(() => import('../pages/ProductPage/ProductPage')),
    exact: true,
  },

  {
    path: RouteNames.CONTACTS,
    component: lazy(() => import('../pages/ContactsPage')),
    exact: true,
  },
  {
    path: RouteNames.SALE,
    component: lazy(() => import('../pages/SalePage')),
    exact: true,
  },
  {
    path: RouteNames.SEARCH,
    component: lazy(() => import('../pages/SearchPage')),
    exact: true,
  },

  {
    path: RouteNames.CART,
    component: lazy(() => import('../pages/CartPage/CartPage')),
    exact: true,
  },
  {
    path: RouteNames.LOGIN,
    component: lazy(() => import('../pages/LoginPage')),
    exact: true,
  },
]

export const privateRoutes: IRoute[] = [
  {
    path: RouteNames.PROFILE,
    component: lazy(() => import('../pages/ProfilePage/ProfilePage')),
    exact: true,
  },
  {
    path: RouteNames.FAVORITES,
    component: lazy(() => import('../pages/FavoritesPage')),
    exact: true,
  },
  {
    path: RouteNames.CHECKOUT,
    component: lazy(() => import('../pages/CheckoutPage/CheckoutPage')),
    exact: true,
  },
]
