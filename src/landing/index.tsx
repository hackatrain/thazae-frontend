import React, {useState, useEffect} from 'react'
import styled from '@emotion/styled'
import {Icon} from 'antd'

import {StationSelector} from './StationSelector'

import {Seller} from '../curry'
import curryList from '../curry-db'
import {TripCard} from '../trip-card'

const Backdrop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;

  height: 100vh;
  min-height: 360px;
  width: 100%;

  background: #f7f7f7;
`

function random<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)]
}

function curryAt(location: string) {
  return curryList.filter(c => c.location.includes(location))
}

function randomCurryAt(location: string): Seller {
  return random(curryAt(location))
}

function randomMetroCurry(): Seller {
  const curries = curryList.filter(c => c.location.includes('MRT'))

  return random(curries)
}

export const metroStations = [
  // 'หัวลำโพง',
  // 'สามย่าน',
  // 'สีลม',
  // 'ลุมพินี',
  'คลองเตย',
  // 'ศูนย์การประชุมแห่งชาติ',
  'สุขุมวิท',
  // 'เพชรบุรี',
  'พระราม 9',
  // 'ศูนย์วัฒนธรรม',
  'ห้วยขวาง',
  'สุทธิสาร',
  'รัชดาภิเษก',
  'ลาดพร้าว',
  'พหลโยธิน',
  'สวนจตุจักร',
  // 'กำแพงเพชร',
  'บางซื่อ',
  // 'เตาปูน',
]

const NextButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 4em;
  height: 4em;
  border: 5px solid white;
  box-shadow: 0px 7px 28px rgba(0, 0, 0, 0.12);
  border-radius: 50%;

  position: relative;
  bottom: -40px;

  color: white;
  outline: none;
  cursor: pointer;
  background: #2ecc71;
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;

  &:hover {
    background: #27ae60;
    transform: scale(1.2);
  }
`

// function next() {
//   if (stationIndex > metroStations.length) {
//     setStationIndex(0)
//     return
//   }

//   setStationIndex(stationIndex + 1)
// }

export const Landing = ({path = ''}) => {
  const [stationIndex, setStationIndex] = useState(0)
  const [curry, setCurry] = useState(null)

  const station = metroStations[stationIndex || 0]

  function randomize() {
    if (station) {
      const curry = randomCurryAt(station)

      setCurry(curry)
    }
  }

  useEffect(randomize, [station])

  const incrStation = (n: number) => {
    const nextIndex = stationIndex + n

    if (nextIndex > metroStations.length || nextIndex < 0) return

    setStationIndex(nextIndex)
  }

  return (
    <Backdrop>
      <StationSelector incr={incrStation} index={stationIndex} />

      <TripCard data={curry} station={station} />

      <NextButton onClick={randomize}>
        <Icon type="thunderbolt" style={{fontSize: 20}} />
      </NextButton>
    </Backdrop>
  )
}
