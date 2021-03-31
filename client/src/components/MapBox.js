
  /*eslint-disable indent */
//import { faAddressBook } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { Link, useParams } from 'react-router-dom'
import locationData from './data/location'

//prettier-ignore
const Map = () => {
  const [popup, setPopup] = useState(null)
  const [pubs, setPubs] = useState(null)
  const { city } = useParams()
  const [viewport, setViewport] = useState({
    latitude: 51.509865,
    longitude: -0.118092,
    zoom: 10.5,
  })
  
  const apiKey = 'pk.eyJ1IjoiaGZyd2Fyd2ljayIsImEiOiJja21sd2p4cTcwYWZqMndsZXhsdG41aDlqIn0.cjW07TW74R2cD05Hap_eQQ'
  
  console.log('>>>>>>>i am the params', city)

  const viewportParams = (params) =>{
    if (params === 'london') {
      setViewport({
        latitude: 51.509865,
        longitude: -0.118092,
        zoom: 11,
      })
    } else if (params === 'manchester') {
      setViewport({
        latitude: 53.483959,
        longitude: -2.244644,
        zoom: 11,
      })
    } else if (params === 'cardiff') {
      setViewport({
        latitude: 51.481583,
        longitude: -3.179090,
        zoom: 11,
      })
    }
  }

  useEffect(() => {
    viewportParams(city)
  }, [])
  useEffect(() => {
    const getPubs = async () => {
      const { data } = await axios.get('/api/pubs')
      setPubs(data)
    }
    getPubs()
  }, [])
  if (!pubs) return null

  return (
    <div className="map-container"> 
      <ReactMapGL
        mapboxApiAccessToken={apiKey}
        height='100vh'
        width='120vh'
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
        {pubs && (
          <div>
            {pubs.map((pub, index) => {
              return (
                <div
                  key={index}
                >
                  <Link to={`/pubs/${pub.id}`}>
                    
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
                  </Link>
                </div>
              )
            })}
          </div>
        )}
        
      </ReactMapGL>
    </div>
  )
}

export default Map
