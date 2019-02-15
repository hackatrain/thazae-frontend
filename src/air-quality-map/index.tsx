import React from 'react'
import GoogleMapReact from 'google-map-react'

import {MapMarker} from './Marker'

const API_KEY = 'AIzaSyA3a8P2sn0z0RTxVlokcl0JNC3ZGlG1y3w'

interface Location {
  aqi: number
  label: string
  latitude: number
  longitude: number
}

interface AQMProps {
  data: Location[]
}

interface AQMState {
  center: {
    lat: number
    lng: number
  }

  zoom: number
}

export class AirQualityMap extends React.Component<AQMProps, AQMState> {
  state: AQMState = {
    center: {lat: 15, lng: 105},
    zoom: 5,
  }

  render() {
    const {data} = this.props
    const {center, zoom} = this.state

    return (
      <GoogleMapReact
        defaultCenter={center}
        defaultZoom={zoom}
        bootstrapURLKeys={{key: API_KEY}}
        yesIWantToUseGoogleMapApiInternals>
        {data.map((location, i) => (
          <MapMarker
            key={i}
            lat={location.latitude}
            lng={location.longitude}
            aqi={location.aqi}
          />
        ))}
      </GoogleMapReact>
    )
  }
}
