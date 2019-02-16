import * as React from 'react'
import {useState} from 'react'

import dataset from '../curry-db'

import './index.css'

type InputChange = React.ChangeEvent<HTMLInputElement>

export interface Seller {
  name: string
  age: number
  cost: number
  gender: string
  location: string
  lineID: string
  image: string

  // Geocoding Result
  lat?: number
  lng?: number
}

function getDataset(): Seller[] {
  return dataset
}

export const Curry = ({path = ''}) => {
  const [name, setName] = useState('')

  const handleChange = (e: InputChange) => setName(e.target.value)

  const list = getDataset().filter(
    curry => curry.name.includes(name) || curry.location.includes(name),
  )
  // .filter(x => x.age <= 20)

  return (
    <div className="App">
      <h1 className="App-Title">Searching for {name}.</h1>

      <label htmlFor="f-search">Name:</label>
      <input id="f-search" type="text" value={name} onChange={handleChange} />

      <div className="card-list-container">
        {list.map(curry => (
          <div className="card">
            <div>Name: {curry.name}</div>
            <div>Age: {curry.age}</div>
            <div>Cost: {curry.cost}</div>
            <div>Gender: {curry.gender}</div>
            <div>
              Location:{' '}
              {curry.location
                .split(',')
                .map(x => x.trim())
                .join(' 𐄁 ')}
            </div>
            <div>Line ID: {curry.lineID}</div>

            <img
              className="curry-image"
              src={`https://finfin.vip${curry.image}`}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  )
}
