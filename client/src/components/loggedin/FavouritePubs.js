import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPayloadFromToken } from '../../helpers/auth'

const FavouritePubs = () => {
  const [user, setUser] = useState(null)
  const userID = getPayloadFromToken().sub
  useEffect( () => {
    const getData = async () => {
      const { data } = await axios.get(`/api/users/${userID}`)
      setUser(data)
    }
    getData()
  }, [])

  if (!user) return null
  return (
    
    <>
      {
        user.favouritePubs.map(pub => {
          return (
            <div key={pub._id}>
              <Link to={`/pubs/${pub._id}`}><div><img src={pub.image} alt={`an image for the pub ${pub.name}`}/></div>
              </Link>
              <div>{pub.nameOfPub}</div>
              <div>{pub.description}</div>
            </div>
          )
        })
      }
    </>
  )
}

export default FavouritePubs
