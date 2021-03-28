import React, { useState } from 'react'
import Header from '../Header'
//import { Link } from 'react-router-dom'
import { ImageUploadField } from '../ImageUploadField'



const Profile = () => {
  const [formdata, setFormdata] = useState({
    profileImage: '',
  })

  console.log(setFormdata)

  const handleSubmit = event => {
    event.preventDefault()
    window.alert(`Submitting ${JSON.stringify(formdata, null, 2)}`)
  }

  const handleImageUrl = url => {
    setFormdata({ ...formdata, profileImage: url })
  }


  return (

    <>
      <Header />
      <section className="account-security-section">
        <h2>Account and Security</h2>
        <div className="account-security-section-sub">
          <div>Username</div>
          <p>enter username here</p>
        </div>
        <div className="account-security-section-sub">
          <div>Email</div>
          <p>enter email here</p>
        </div>
        <div className="account-security-section-sub">
          <div>Member Since</div>
          <p>enter accounted created info here</p>
        </div>
        <button className="edit-profile-button">Edit My Profile</button>
        <button className="delete-account-button">Delete My Account</button>
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
