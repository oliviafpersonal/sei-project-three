import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getPayloadFromToken } from '../../helpers/auth'
import { convertTimestamp } from '../../helpers/helperFunctions'
import Header from '../Header'
import { ImageUploadField } from '../ImageUploadField'



const Profile = () => {
  const [user, setUser] = useState({})
  const [formdata, setFormdata] = useState({
    profileImage: '',
  })
  const [isEditActive, setIsEditActive] = useState(false)
  console.log(setFormdata)


  const userID = getPayloadFromToken().sub
  const handleEditButton = () => {
    setIsEditActive(!isEditActive)
    console.log(isEditActive)
  }
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
            <button className="edit-profile-button" onClick={handleEditButton}>Edit My Profile</button>
            <button className="delete-account-button">Delete My Account</button>
          </div>
        </div>
      </section>
      <div className={`modal ${isEditActive && 'is-active'}` }>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input className="input" type="text" placeholder="Text input" />
            </div>
          </div>

          <div className="field">
            <label className="label">Username</label>
            <div className="control has-icons-left has-icons-right">
              <input className="input is-success" type="text" placeholder="Text input" value="bulma" />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
            </div>
            <p className="help is-success">This username is available</p>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input className="input is-danger" type="email" placeholder="Email input" value="hello@" />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle"></i>
              </span>
            </div>
            <p className="help is-danger">This email is invalid</p>
          </div>

          <div className="field">
            <label className="label">Subject</label>
            <div className="control">
              <div className="select">
                <select>
                  <option>Select dropdown</option>
                  <option>With options</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Message</label>
            <div className="control">
              <textarea className="textarea" placeholder="Textarea"></textarea>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input type="checkbox" />
      I agree to the <a href="#">terms and conditions</a>
              </label>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="radio">
                <input type="radio" name="question" />
      Yes
              </label>
              <label className="radio">
                <input type="radio" name="question" />
      No
              </label>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
            <div className="control">
              <button className="button is-link is-light">Cancel</button>
            </div>
          </div>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={handleEditButton}></button>
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
