import * as React from 'react'
import * as ReactDOM from 'react-dom'

import 'babel-polyfill'

import {App} from './common/App'

import 'antd/dist/antd.css'

import './index.sass'

ReactDOM.render(<App />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}
