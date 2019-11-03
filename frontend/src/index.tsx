import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router} from 'react-router-dom'
import store from './store'
import App from './components/app';

import './styles.scss'

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <Router>
      <div>
       <App />
      </div>
    </Router>
  </Provider>,
  target
)

// yarn
// yarn start
