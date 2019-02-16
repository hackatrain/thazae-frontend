import React from 'react'

import {CurryMap} from './Map'

import curryList from '../curry-db'

export function CurryMapView({path = ''}) {
  return <CurryMap data={curryList} />
}
