/*eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPayloadFromToken } from '../../helpers/auth'
import Header from '../Header'
import PubCard from '../pub/PubCard'

const PubSaved = () => {
  const [user, setUser] = useState(null)

  const userID = getPayloadFromToken().sub

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/users/${userID}`)
      setUser(data)
    }
    getData()
  }, [])

  if (!user) return null

  return (
    <>
      <Header />
      <div className="submit-review-container">
        <div className="columns">
          <div className="column is-two-thirds">
            <div className="submit-review-details">
              {/* <div className="review-breadcrumb"><b> <Link to={`/pubs/${_id}`}>Pub</Link> <span className="crumb-arrow">{'>'} </span> {'Submit Review'}</b></div> */}
              <h2>Your Favourite pubs</h2>
              <hr />
              <p>A collection of all of your favourite pubs</p>
              <br />
            </div>
            {user.favouritePubs.map((pub) => {
              const { image, nameOfPub, _id } = pub
              return (
                <div key={_id} className="column">
                  <div className="columns">
                    <div className="column">
                      <Link to={`/pubs/${_id}`}>
                        <img
                          className="pubcard-image"
                          src={image}
                          alt={nameOfPub}
                        />
                      </Link>
                    </div>
                    <div className="column">
                      <h4>{nameOfPub}</h4>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="column"></div>
        </div>
      </div>
    </>
  )
}

export default PubSaved
