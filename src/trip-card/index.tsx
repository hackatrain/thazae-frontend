import React from 'react'
import styled from '@emotion/styled'

import {Seller} from '../curry'

const Card = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  text-decoration: none;

  font-size: 2em;
  background: #ffffff;
  box-shadow: 0px 7px 28px rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  width: 95%;
  max-width: 300px;
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0px 7px 28px rgba(0, 0, 0, 0.16);

    .x-card-title {
      background: linear-gradient(45deg, #3a3897, #a3a1ff);
    }
  }
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
  font-size: 0.85em;
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

  background: linear-gradient(45deg, #3c8ce7, #00eaff);
`

function getLocation(location: string) {
  return location
    .split(',')
    .map(x => x.trim())
    .find(x => x.includes('MRT'))
}

const POST_URL = FF_BASE + '/post/'

export function TripCard({data, station}: TripCardProps) {
  if (!data) return null

  return (
    <Card href={POST_URL + data.name} target="_blank">
      <CardTitle className="x-card-title">
        {station || getLocation(data.location)}
      </CardTitle>

      <CardContent>
        <Avatar src={FF_BASE + data.image} />

        <Name>{data.name}</Name>
        <Info>
          <div>{numberWithCommas(data.cost)} THB</div>
          <div>{data.age} y/o</div>
          <div>{data.lineID}</div>
        </Info>
      </CardContent>
    </Card>
  )
}
