import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { App } from './App'
import { Modal } from './components/Modals/Modal'
import store from './store'
import { Theme } from './theme/Theme'

ReactDOM.render(
  <Provider store={store}>
    <Theme>
      <Router>
        <App />
        <Modal />
      </Router>
    </Theme>
  </Provider>,
  document.getElementById('root')
)
