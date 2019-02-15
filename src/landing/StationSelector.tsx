import React from 'react'
import styled from '@emotion/styled'

import {metroStations} from '.'

interface CircleProps {
  y: number
}

type StationNodeProps = {
  idx: number
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
} & CircleProps

export const LineBackdrop = styled.div`
  position: absolute;
  top: 50%;

  opacity: 0.5;
  width: 100%;
  height: 10px;
  background: white;

  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.12);
`

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

const StationTitle = styled.div`
  position: absolute;

  color: #444;
  font-size: 22px;

  top: 60px;
  pointer-events: none;
  text-align: center;
  white-space: pre;
`

export const StationNode = ({y, idx, onClick}: StationNodeProps) => (
  <StationCircle y={y} onClick={onClick}>
    <StationInnerCircle />

    <StationTitle>{metroStations[idx]}</StationTitle>
  </StationCircle>
)

interface StationSelectorProps {
  index: number
  incr: (by: number) => void
}

export const StationSelector = ({index, incr}: StationSelectorProps) => (
  <>
    <LineBackdrop />

    <StationNode y={10} idx={index - 2} onClick={() => incr(-2)} />
    <StationNode y={25} idx={index - 1} onClick={() => incr(-1)} />
    <StationNode y={70} idx={index + 1} onClick={() => incr(+1)} />
    <StationNode y={85} idx={index + 2} onClick={() => incr(+2)} />
  </>
)
