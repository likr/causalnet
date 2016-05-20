/* global document */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import store from './store'

ReactDOM.render(<App store={store()}/>, document.getElementById('content'))
