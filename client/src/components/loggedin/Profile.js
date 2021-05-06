/*eslint-disable no-unused-vars*/
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getPayloadFromToken, userIsOwner } from '../../helpers/auth'
import { convertTimestamp } from '../../helpers/helperFunctions'

//icons

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

// components

import EditProfile from '../Modals/Forms/EditProfile'
import Header from '../Header'
import ProfileReviews from './ProfileReviews'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [pubs, setPubs] = useState(null)

  const [detailShow, setDetailShow] = useState(false)

  const editShow = () => {
    !detailShow ? setDetailShow(true) : setDetailShow(false)
  }

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

  const {
    username,
    email,
    createdAt,

    profileImage,
  } = user
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
                <Link to={`/profile/${userID}/edit-profile-image`}>
                  <div
                    className="edit-profile-button"
                    name="edit-profile-image"
                  >
                    Change Image
                  </div>
                </Link>
                <hr />
                <div>
                  <b>Email</b>
                </div>
                <p>{email}</p>
                <hr />

                <Link to={`/profile/delete-account/${userID}`}>
                  <button
                    className="delete-account-button button"
                    name="delete-profile"
                  >
                    Delete My Account
                  </button>
                </Link>
              </div>
            </div>

            <div className="column">
              <div className="username">
                <h2>{`Hi, i'm ${username}`}</h2>
                <p>{`Joined in ${convertTimestamp(createdAt)} `}</p>
              </div>
              {/* <Link to={`/profile/${userID}/edit`}>
                <div className="edit-profile-button" name="edit-profile">
                  Edit My Profile
                </div>
              </Link> */}

              <div
                className="edit-profile-button"
                name="edit-account"
                onClick={editShow}
              >
                Edit Account Details
              </div>
              <hr />
              {detailShow && <EditProfile />}

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
                <ProfileReviews
                  userID={userID}
                  reviews={reviews}
                  displayNumber={3}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Profile
