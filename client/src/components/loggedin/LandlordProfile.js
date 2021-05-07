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
  const { isLandlord, username, createdAt, profileImage } = user
  const reviews = pubs
    .map((pub) => pub.reviews)
    .flat()
    .filter((review) => review.reviewOwner === userID)
  return (
    <>
      <Header />
      {user && (
        <div className="profile-container">
          <div className="columns">
            {/* <div className="column">
              {' '}
              <div className="profile-box">
                <img
                  className="profile-image"
                  alt="user profile image"
                  src={profileImage}
                />

                <hr />
              </div>
            </div> */}

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
                    <section className="section">
                      <div className="container">
                        <div className="columns is-multiline">
                          {pubs
                            .filter((pub) => pub.pubOwner === userID)
                            .map((pub, index) => {
                              return (
                                <>
                                  <div
                                    key={pub._id}
                                    className="column is-one-quarter-desktop is-one-third-tablet"
                                  >
                                    <div className="owned-pubs">
                                      <div className="owned-pubs card-image ">
                                        <figure className="image resize image-is-1by1">
                                          <Link to={`/pubs/${pub._id}`}>
                                            <img
                                              src={pub.image}
                                              alt={pub.nameOfPub}
                                            />
                                          </Link>
                                        </figure>
                                      </div>
                                      <div className="card-header ">
                                        <div className="card-header-title">
                                          {pub.nameOfPub}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* <div
                                    key={index}
                                    className={`item-${index} column`}
                                  >
                                    <div>{pub.nameOfPub}</div>
                                    <Link to={`/pubs/${pub._id}`}>
                                      <div>
                                        <img
                                          src={pub.image}
                                          alt={`an image for the pub ${pub.name}`}
                                        />
                                      </div>
                                    </Link>
                                  </div> */}
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
