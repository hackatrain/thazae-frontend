import * as React from 'react'
import {Router} from '@reach/router'

import {SideBar} from './SideBar'
import {Curry} from '../curry'
import {Landing} from '../landing'

export const App = () => (
  <Router>
    <Landing path="/" />
    <Curry path="/curry" />
  </Router>
)
