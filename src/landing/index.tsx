import React, {useState, useEffect} from 'react'
import styled from '@emotion/styled'

import curryList from '../curry/result'

import {TripCard} from '../trip-card'
import {Seller} from '../curry'
import {Icon} from 'antd'

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

const LineBackdrop = styled.div`
  position: absolute;
  top: 50%;

  opacity: 0.5;
  width: 100%;
  height: 10px;
  background: white;

  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.12);
`

interface CircleProps {
  y: number
}

const StationCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: calc(50% - 1.1em);
  left: ${(props: CircleProps) => props.y || 20}%;

  width: 3em;
  height: 3em;

  border-radius: 50%;
  background: linear-gradient(45deg, #3c8ce7, #00eaff);

  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;

  cursor: pointer;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: scale(1.15);
    background: linear-gradient(45deg, #ed1c24, #fcee21);
  }
`

const StationInnerCircle = styled.div`
  background: white;
  width: 2.3em;
  height: 2.3em;
  border-radius: 50%;

  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
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

const metroStations = [
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

const StationTitle = styled.div`
  position: absolute;

  color: #444;
  font-size: 22px;

  top: 60px;
  pointer-events: none;
  text-align: center;
  white-space: pre;
`

type StationNodeProps = {
  idx: number
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
} & CircleProps

const StationNode = ({y, idx, onClick}: StationNodeProps) => (
  <StationCircle y={y} onClick={onClick}>
    <StationInnerCircle />

    <StationTitle>{metroStations[idx]}</StationTitle>
  </StationCircle>
)

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

const StationSelector = ({index, incr}) => (
  <>
    <LineBackdrop />
    <StationNode y={10} idx={index - 2} onClick={() => incr(-2)} />
    <StationNode y={25} idx={index - 1} onClick={() => incr(-1)} />
    <StationNode y={70} idx={index + 1} onClick={() => incr(+1)} />
    <StationNode y={85} idx={index + 2} onClick={() => incr(+2)} />
  </>
)

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
        <Icon type="arrow-right" style={{fontSize: 20}} />
      </NextButton>
    </Backdrop>
  )
}
