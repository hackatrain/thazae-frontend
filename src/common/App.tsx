import * as React from 'react'
import {Router} from '@reach/router'

import {SideBar} from './SideBar'
import {Curry} from '../curry'

const Home = ({path = ''}) => <div>Hello</div>

export const App = () => (
  <SideBar>
    <Router>
      <Home path="/" />
      <Curry path="/curry" />
    </Router>
  </SideBar>
)
