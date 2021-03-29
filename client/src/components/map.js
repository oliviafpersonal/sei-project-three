/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import locationData from './data/location'

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 51.509865,
    longitude: -0.118092,
    zoom: 11,
  })

  const [popup, setPopup] = useState(null)

  const apiKey = 'pk.eyJ1IjoiaGZyd2Fyd2ljayIsImEiOiJja21sd2p4cTcwYWZqMndsZXhsdG41aDlqIn0.cjW07TW74R2cD05Hap_eQQ'
  console.log('popup', popup)
  return (
    <div className="map-container"> 
      <ReactMapGL
        mapboxApiAccessToken={apiKey}
        height='100vh'
        width='100hvh'
        mapStyle='mapbox://styles/mapbox/streets-v11'
        {...viewport}
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        {locationData.map((location, index) => {
          return <Marker key={index} longitude={location.longitude} latitude={location.latitude}>
            <span onClick={() => setPopup(location)}>
              {location.icon}
            </span>
          </Marker>
        })}
        {popup &&
        <Popup
          latitude={popup.latitude}
          longitude={popup.longitude}
          closeOnClick={true}
          onClose={() => setPopup(null)}
        >
          <div>{popup.name}</div>
        </Popup>
        }

      </ReactMapGL>
    </div>
  )
}

export default Map


