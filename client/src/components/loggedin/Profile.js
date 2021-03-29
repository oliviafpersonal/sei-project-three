/*eslint-disable no-unused-vars*/
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getPayloadFromToken/*, getTokenFromLocalStorage*/ } from '../../helpers/auth'
import { convertTimestamp, displayModal } from '../../helpers/helperFunctions'
import DeleteProfile from '../Modals/Forms/DeleteProfile'
import EditProfile from '../Modals/Forms/EditProfile'
import Header from '../Header'
import PubComments from '../pub/PubComments'


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
  const cancelEdit = (event) => {
    //do something to clear the form data
    handleToggleEdit(event)
  }

  const submitEdit = async (event) => {
    console.log(event.target)
    event.preventDefault()
  }
  // useEffect(() => {
  //   reviews.reverse()
  // }, [user])

  if (!user) return null
  const { isLandlord, profileImage, username, email, createdAt, allReviews: reviews } = user


  return (

    <>
      <Header />
      <section className="account-security-section">
        <h2>Account and Security</h2>
        <div className="account-card">
          <div className="account-card-left">
            <img src={profileImage} alt="user profile image" />
          </div>
          <div className="account-card-right ">
            <div className="account-card-sub">
              <div>Username: </div>
              <p>{username}</p>
            </div>
            <div className="account-card-sub">
              <div>Email</div>
              <p>{email}</p>
            </div>
            <div className="account-card-sub">
              <div>Member Since</div>
              <p>{convertTimestamp(createdAt)}</p>
            </div>
            <button className="edit-profile-button" name="edit-profile" onClick={handleToggleEdit}>Edit My Profile</button>
            <button className="delete-account-button" name="delete-profile" onClick={handleToggleDelete}>Delete My Account</button>
          </div>
        </div>
      </section>
      {displayModal(isEditActive, EditProfile, handleToggleEdit)}
      {displayModal(isDeleteActive, DeleteProfile, handleToggleDelete)}
      <section className="account-activity-section">
        <h2>Activity</h2>
        <div className="account-card-sub">
          <h3>Last Viewed Pub</h3>
          <p>use history to display</p>
        </div>
        <div className="account-card-sub">
          <div className="comments">
            <h3>Last Review Submitted</h3>
            {reviews && <PubComments reviews={reviews} displayNumber={2} />}
          </div>
        </div>
      </section>
      {isLandlord &&
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
      }

    </>
  )
}

export default Profile
