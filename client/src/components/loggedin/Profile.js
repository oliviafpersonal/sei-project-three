/*eslint-disable no-unused-vars*/
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  getPayloadFromToken /*, getTokenFromLocalStorage*/
} from '../../helpers/auth'
import { convertTimestamp } from '../../helpers/helperFunctions'
import EditProfile from '../Modals/Forms/EditProfile'
import Header from '../Header'
import ProfileReviews from './ProfileReviews'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Profile = () => {
  const [user, setUser] = useState({})
  const [isEditActive, setIsEditActive] = useState(false)
  const [isDeleteActive, setIsDeleteActive] = useState(false)

  const userID = getPayloadFromToken().sub

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`/api/users/${userID}`)
      setUser(data)
    }
    getUser()
  }, [])

  const handleToggleEdit = () => {
    setIsEditActive(!isEditActive)
  }
  const handleToggleDelete = () => {
    setIsDeleteActive(!isDeleteActive)
  }

  //console.log('Bearer', getTokenFromLocalStorage())

  // useEffect(() => {
  //   reviews.reverse()
  // }, [user])

  //prettier-ignore
  const {
    isLandlord,
    profileImage,
    username,
    email,
    createdAt,
    allReviews: reviews,
  } = user

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
                  src={profileImage}
                  alt="user profile image"
                />

                {EditProfile()}
              </div>
            </div>

            <div className="column">
              <div className="username">
                <h2>{`Hi, i'm ${username}`}</h2>
                <p>{`Joined in ${convertTimestamp(createdAt)} `}</p>
              </div>
              <div
                className="edit-profile-button"
                name="edit-profile"
                onClick={handleToggleEdit}
              >
                Edit My Profile
              </div>
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
                <ProfileReviews reviews={reviews} displayNumber={3} />
              )}
            </div>
          </div>

          <div>Email</div>
          <p>{email}</p>

          <button
            className="delete-account-button"
            name="delete-profile"
            onClick={handleToggleDelete}
          >
            Delete My Account
          </button>

          <section className="account-activity-section">
            <h2>Activity</h2>
            <div className="account-card-sub">
              <h2>Last Viewed Pub</h2>
              <p>use history to display</p>
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
              </section>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default Profile
