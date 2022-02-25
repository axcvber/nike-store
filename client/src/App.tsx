import React from 'react'
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { Container } from './theme'
import { Footer } from './components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/ducks/auth/auth-reducer'
import { RootState } from './store/rootReducer'
import { AppRouter } from './components/AppRouter'
import { RouteNames } from './routes'
import { AdminPage } from './pages/AdminPage/AdminPage'
import HomePage from './pages/HomePage/HomePage'

export const App = withRouter(({ location }) => {
  const { data, isPending } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const isAdmin = data.role === 'ADMIN'

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth())
    }
  }, [dispatch])

  if (isPending) {
    return <div>Check Auth...</div> //refactor
  }

  return (
    <>
      {location.pathname.match('/admin') && isAdmin ? (
        <Route path={RouteNames.ADMIN} component={AdminPage} />
      ) : (
        <>
          <Navbar />
          <AppRouter />
          <Footer />
        </>
      )}
    </>
  )
})
