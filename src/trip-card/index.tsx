import React from 'react'
import styled from '@emotion/styled'

import {Seller} from '../curry'
import {getDefaultDecoratorFromObjectOptions} from 'mobx/lib/internal'

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  font-size: 2em;
  background: #ffffff;
  box-shadow: 0px 7px 28px rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  width: 95%;
  max-width: 300px;
`

const Avatar = styled.img`
  /* position: absolute;
  top: -2em; */

  width: 4em;
  height: 4em;
  border: 5px solid white;
  box-shadow: 0px 7px 28px rgba(0, 0, 0, 0.12);
  border-radius: 50%;
  /* filter: blur(3px); */
`

const FF_BASE = 'https://finfin.vip'

const Name = styled.div`
  color: #555;
  font-weight: bold;
  margin-top: 1em;
`

const Info = styled.div`
  color: #666;
  font-weight: 300;
  margin-top: 0.3em;
`

interface TripCardProps {
  data: Seller
  station: string
}

export function numberWithCommas(n: number) {
  const parts = n.toString().split('.')

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return parts.join('.')
}

const CardContent = styled.div`
  padding: 1.1em 2em;
  text-align: center;
`

const CardTitle = styled.div`
  color: white;
  padding: 0.4em 0;
  width: 100%;
  text-align: center;

  font-size: 0.85em;
  font-weight: 500;

  /* background: linear-gradient(45deg, #3a3897, #a3a1ff); */
  background: linear-gradient(45deg, #3c8ce7, #00eaff);
`

function getLocation(location: string) {
  return location
    .split(',')
    .map(x => x.trim())
    .find(x => x.includes('MRT'))
}

export function TripCard({data, station}: TripCardProps) {
  if (!data) return null

  return (
    <Card>
      <CardTitle>{station || getLocation(data.location)}</CardTitle>

      <CardContent>
        <Avatar src={FF_BASE + data.image} />

        <Name>{data.name}</Name>
        <Info>{numberWithCommas(data.cost)} THB</Info>
        <Info>{data.age} y/o</Info>
      </CardContent>
    </Card>
  )
}
