/*eslint-disable no-unused-vars*/
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getPayloadFromToken, userIsOwner } from '../../helpers/auth'
import { convertTimestamp } from '../../helpers/helperFunctions'

//icons

import { Link } from 'react-router-dom'

// components

import Header from '../Header'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [pubs, setPubs] = useState(null)

  const userID = getPayloadFromToken().sub

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`/api/users/${userID}`)
      setUser(data)
    }
    const getPubs = async () => {
      const { data } = await axios.get('/api/pubs')
      setPubs(data)
    }
    getUser()
    getPubs()
  }, [])
  //prettier-ignore
  if (!user || !pubs) return null
  console.log('userID', userID)
  const { isLandlord, username, createdAt, profileImage } = user
  const reviews = pubs
    .map((pub) => pub.reviews)
    .flat()
    .filter((review) => review.reviewOwner === userID)

  console.log('profile', user)
  console.log('profile', reviews)

  return (
    <>
      <Header />
      {user && (
        <div className="profile-container">
          <div className="columns">
            <div className="column">
              {' '}
              <div className="profile-box">
                <img
                  className="profile-image"
                  alt="user profile image"
                  src={profileImage}
                />

                <hr />
              </div>
            </div>

            <div className="column">
              <div className="username">
                <h2>{`${username}'s Landlord Profile`}</h2>
                <p>{`Joined in ${convertTimestamp(createdAt)} `}</p>
              </div>
              <hr />
              <b>Your pubs</b>
              {isLandlord && (
                <>
                  <section className="account-owned-pubs">
                    <b>Your Pubs</b>
                    <section className="section">
                      <div className="container">
                        <div id="carousel-demo" className="carousel">
                          {pubs
                            .filter((pub) => pub.pubOwner === userID)
                            .map((pub, index) => {
                              return (
                                <>
                                  <div className={`item-${index} column`}>
                                    <div>{pub.nameOfPub}</div>
                                    <Link to={`/pubs/${pub._id}`}>
                                      <div>
                                        <img
                                          src={pub.image}
                                          alt={`an image for the pub ${pub.name}`}
                                        />
                                      </div>
                                    </Link>
                                  </div>
                                </>
                              )
                            })}
                        </div>
                      </div>
                    </section>
                  </section>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Profile
