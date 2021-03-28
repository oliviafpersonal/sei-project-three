import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getPayloadFromToken } from '../../helpers/auth'
import { convertTimestamp } from '../../helpers/helperFunctions'
import Header from '../Header'
//import { ImageUploadField } from '../ImageUploadField'

/*eslint-disable no-unused-vars*/

const Profile = () => {
  // const [formdata, setFormdata] = useState({
  //   profileImage: '',
  // })
  // const handleSubmit = event => {
  //   event.preventDefault()
  //   window.alert(`Submitting ${JSON.stringify(formdata, null, 2)}`)
  // }
      
  // const handleImageUrl = url => {
  //   setFormdata({ ...formdata, profileImage: url })
  // }
  // console.log(setFormdata)

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

  const handleToggle = (event) => {
    const buttonValue = event.target.value
    buttonValue === 'edit-profile' ? setIsEditActive(!isEditActive)
      : buttonValue === 'delete-proile' ? setIsDeleteActive(!isDeleteActive)
        : setIsEditActive(!isEditActive), setIsDeleteActive(!isDeleteActive)
  }

  const cancelEdit = (event) => {
    //do something to clear the form data
    handleToggle(event)
  }

  const submitEdit = async (event) => {
    console.log(event.target)
    event.preventDefault()
  }

  if (!user) return null
  const { isLandlord, profileImage, username, email, createdAt } = user
  return (

    <>
      <Header />
      <section className="account-security-section">
        <h2>Account and Security</h2>
        <div className="account-card">
          <div className="account-card-left">
            <img src={profileImage} alt="user profile image"/>
          </div>
          <div className="account-card-right ">
            <div className="account-card-sub">
              <div>Username</div>
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
            <button className="edit-profile-button" value="edit-profile" onClick={handleToggle}>Edit My Profile</button>
            <button className="delete-account-button" value="delete-profile" onClick={handleToggle}>Delete My Account</button>
          </div>
        </div>
      </section>
      <div className={`modal ${isEditActive && 'is-active'}` }>
        <div className="modal-background"></div>
        <div className="modal-content">
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={handleToggle}></button>
      </div>
      <section className="account-activity-section">
        <h2>Activity</h2>
        <div className="account-card-sub">
          <div>Last Viewed Pub</div>
          <p>use history to display</p>
        </div>
        <div className="account-card-sub">
          <div>Last Review Submitted</div>
          <p>display last review</p>
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

      {/* <form onSubmit={handleSubmit}>
        <div>
          <ImageUploadField
            value={formdata.profileImage}
            name="profileImage"
            handleImageUrl={handleImageUrl}
          />
        </div>
      </form> */}
    </>
  )
}

export default Profile
