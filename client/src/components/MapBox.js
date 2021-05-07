import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { Link, useParams } from 'react-router-dom'
import locationData from './data/location'
// import 'mapbox-gl/dist/mapbox-gl.css'
// import mapboxgl from 'mapbox-gl'

// mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default

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
  
  const apiKey = process.env.REACT_APP_MAPBOX_KEY
  


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
    } else if (params === 'leeds') {
      setViewport({
        latitude: 53.801277,
        longitude: -1.548567,
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
          return (!pub.longitude || !pub.latitude) ? null :
            <Marker key={pub.id} longitude={pub.longitude} latitude={pub.latitude}>
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
