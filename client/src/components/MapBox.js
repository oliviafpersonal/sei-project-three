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

  

  const pubsWithLocation = pubs.map(pub => {
    for (let i = 0; i < locationData.length; i++) {
      if (locationData[i].name === pub.nameOfPub) {
        pub.longitude = locationData[i].longitude
        pub.latitude = locationData[i].latitude
      }
    }
    return pub
  })
  console.log('pubswith location', pubsWithLocation)
  return (
    <div className="map-container"> 
      <ReactMapGL
        mapboxApiAccessToken= {apiKey}
        height='100%'
        width='100%'
        mapStyle='mapbox://styles/mapbox/streets-v11'
        {...viewport}
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        {pubsWithLocation.map(pub => {
          return <Marker key={pub.id} longitude={pub.longitude} latitude={pub.latitude}>
            <span onClick={() => setPopup(pub)}>
              {'🍺'}
            </span>
          </Marker>
        })}
        {popup &&
        <Link to={`/pubs/${popup._id}`}>
          <Popup
            latitude={popup.latitude}
            longitude={popup.longitude}
            closeOnClick={false}
            onClose={() => setPopup(null)}
          >
            <div>{popup.nameOfPub}</div>
          </Popup>
        </Link>
        }

      </ReactMapGL>
    </div>
  )
}

export default Map
