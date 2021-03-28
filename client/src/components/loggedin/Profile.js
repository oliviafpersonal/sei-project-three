import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { convertTimestamp } from '../../helpers/helperFunctions'
import Header from '../Header'
import { ImageUploadField } from '../ImageUploadField'



const Profile = () => {
  const [user, setUser] = useState({})
  const [formdata, setFormdata] = useState({
    profileImage: '',
  })
  console.log(setFormdata)


  const userID = '6060a178fc05a32fdf1cb2d8'
  
  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`/api/users/${userID}`)
      setUser(data)
    }
    getUser()
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    window.alert(`Submitting ${JSON.stringify(formdata, null, 2)}`)
  }

  const handleImageUrl = url => {
    setFormdata({ ...formdata, profileImage: url })
  }
  
  if (!user) return null
  console.log(user)
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
          <div className="account-card-right">
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
            <button className="edit-profile-button">Edit My Profile</button>
            <button className="delete-account-button">Delete My Account</button>
          </div>
        </div>
      </section>
      <section className="account-activity-section">
        <h2>Activity</h2>
        <div>Last Viewed Pub</div>
        <p>use history to display</p>
        <div>Last Review Submitted</div>
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

      <form onSubmit={handleSubmit}>
        <div>
          <ImageUploadField
            value={formdata.profileImage}
            name="profileImage"
            handleImageUrl={handleImageUrl}
          />
        </div>
      </form>
    </>
  )
}

export default Profile
