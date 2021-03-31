/*eslint-disable no-unused-vars*/
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getPayloadFromToken, userIsOwner } from '../../helpers/auth'
import { convertTimestamp } from '../../helpers/helperFunctions'
import Header from '../Header'
import ProfileReviews from './ProfileReviews'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

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
  const {
    isLandlord,
    username,
    email,
    createdAt,
    favouritePubs,
    profileImage,
  } = user
  const reviews =
    pubs
      .map(pub => pub.reviews).flat()
      .filter(review => review.reviewOwner === userID)

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

              </div>
            </div>

            <div className="column">
              <div className="username">
                <h2>{`Hi, i'm ${username}`}</h2>
                <p>{`Joined in ${convertTimestamp(createdAt)} `}</p>
              </div>
              <Link to={`/profile/${userID}/edit`}>
                <div
                  className="edit-profile-button"
                  name="edit-profile">
                  Edit My Profile
                </div>
              </Link>
              <div className="card-rating">
                <div className="rating-star2">
                  <FontAwesomeIcon icon={faStar} className="fa-1x" />
                </div>

                <p className="overall-rating">
                  {reviews && `(${reviews.length} reviews)`}
                </p>
              </div>
              <hr />
              <p>Reviews by you</p>
              {reviews && (
                <ProfileReviews userID={userID} reviews={reviews} displayNumber={3} />
              )}
            </div>
          </div>

          <div>Email</div>
          <p>{email}</p>

          <Link to={`/profile/delete-account/${userID}`}>
            <button
              className="delete-account-button"
              name="delete-profile">
              Delete My Account
            </button>
          </Link>

          <section className="account-activity-section">
            <h2>Activity</h2>
            <div className="account-card-sub">
              <h2>Last Viewed Pub</h2>
              <p>use history to display</p>
            </div>
            <div className="account-card-sub">
              <h2>Favourite Pubs</h2>
              {
                favouritePubs.map(pub => {
                  return (
                    <>
                      <div className="favourite-pubs">
                        <div>{pub.nameOfPub}</div>
                        <Link to={`/pubs/${pub._id}`}><div><img src={pub.image} alt={`an image for the pub ${pub.name}`}/></div></Link>
                      </div>
                    </>

                  )
                })
              }
            </div>
            <div className="account-card-sub">
              <div className="comments">
                <h3>Last Review Submitted</h3>
              </div>
            </div>
          </section>

          {isLandlord && (
            <>
              <section className="account-favourites-section">
                <h2>Favourites</h2>
              </section>
              <section className="account-pub-crawls">
                <h2>Saved Crawls</h2>
              </section>
              <section className="account-owned-pubs">
                <h2>Your Pubs</h2>
                <section className="section">
                  <div className="container">
                    <div id="carousel-demo" className="carousel">
                      {pubs
                        .filter(pub => pub.pubOwner === userID)
                        .map((pub, index) => {
                          return (
                            <>
                              <div className={`item-${index} column`}>
                                <div>{pub.nameOfPub}</div>
                                <Link to={`/pubs/${pub._id}`}><div><img src={pub.image} alt={`an image for the pub ${pub.name}`} /></div></Link>
                              </div>
                            </>
                          )
                        })
                      }
                    </div>
                  </div>
                </section>
              </section>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default Profile
