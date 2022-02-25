import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import NotFoundPage from '../pages/NotFoundPage'
import { privateRoutes, publicRoutes, RouteNames } from '../routes'
import { RootState } from '../store/rootReducer'

export const AppRouter = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        {publicRoutes.map(({ component: Component, path, exact }) => (
          <Route key={path} path={path} exact={exact}>
            <Component />
          </Route>
        ))}
        {privateRoutes.map(({ component: Component, path, exact }) => (
          <Route
            key={path}
            path={path}
            exact={exact}
            render={({ location }) =>
              isAuth ? (
                <Component />
              ) : (
                <Redirect
                  to={{
                    pathname: RouteNames.LOGIN,
                    state: { from: location },
                  }}
                />
              )
            }
          />
        ))}
        <Route path='*' component={NotFoundPage} />
      </Switch>
    </Suspense>
  )
}
