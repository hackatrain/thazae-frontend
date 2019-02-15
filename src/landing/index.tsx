import React from 'react'
import styled from '@emotion/styled'

import locations from '../thailand-location'
import {AirQualityMap} from '../pm-map'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 2em;
  max-width: 1000px;
  margin: 0 auto;
`

export const Landing = ({path = ''}) => {
  return (
    <Container>
      <AirQualityMap data={locations} />
    </Container>
  )
}
