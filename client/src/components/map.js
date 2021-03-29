/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import locationData from './data/location'

const MultipleMarkers = () => {
  const [viewport, setViewport] = useState({
    latitude: 51.515,
    longitude: -0.078,
    zoom: 4,
  })

  const [popup, setPopup] = useState(null)

  const apiKey = 'pk.eyJ1IjoiaGZyd2Fyd2ljayIsImEiOiJja21sd2p4cTcwYWZqMndsZXhsdG41aDlqIn0.cjW07TW74R2cD05Hap_eQQ'
  console.log('popup', popup)
  return (
    <div className="map-container"> 
      <ReactMapGL
        mapboxApiAccessToken={apiKey}
        height='50%'
        width='50%'
        mapStyle='mapbox://styles/mapbox/streets-v11'
        {...viewport}
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        {locationData.map(location => {
          return <Marker key={location.id} longitude={location.longitude} latitude={location.latitude}>
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

export default MultipleMarkers


