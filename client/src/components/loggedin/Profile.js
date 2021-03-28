import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../Header'
//import { Link } from 'react-router-dom'
import { ImageUploadField } from '../ImageUploadField'



const Profile = () => {
  const [user, setUser] = useState({})
  const [formdata, setFormdata] = useState({
    profileImage: '',
  })
  console.log(setFormdata)


  const userID = '605fad696b0c0225f0e248a0'
  
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
  return (

    <>
      {/* { const {isLandlord, profileImage, username, email}} */}
      <Header />
      <section className="account-security-section">
        <h2>Account and Security</h2>
        <div className="account-card">
          <div className="account-card-left">
            <img src="" alt="user profile image"/>
          </div>
          <div className="account-card-right">
            <div className="account-card-sub">
              <div>Username</div>
              <p>enter username here</p>
            </div>
            <div className="account-card-sub">
              <div>Email</div>
              <p>enter email here</p>
            </div>
            <div className="account-card-sub">
              <div>Member Since</div>
              <p>enter accounted created info here</p>
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
      <section className="account-favourites-section">
        <h2>Favourites</h2>
      </section>
      <section className="account-pub-crawls">
        <h2>Saved Crawls</h2>
      </section>
      <section className="account-owned-pubs">
        <h2>Your Pubs</h2>
      </section>

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
