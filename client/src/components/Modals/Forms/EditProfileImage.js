import axios from 'axios'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { getTokenFromLocalStorage } from '../../../helpers/auth'
import { ImageUploadField } from '../../ImageUploadField'
import { Link } from 'react-router-dom'

//components

import Header from '../../Header'

const EditProfileImage = () => {
  const { userID } = useParams()

  const history = useHistory()

  //prettier-ignore
  const [formData, setFormData] = useState({
    profileImage: '',
  })

  const handleImageUrl = (url) => {
    setFormData({ ...formData, profileImage: url })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await axios.put(`/api/users/${userID}`, formData, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    })
    handleImageUrl()
    history.push(`/profile/${userID}`)
  }
  const handleCancel = () => {
    history.push(`/profile/${userID}`)
  }
  return (
    <>
      <Header />
      <div className="submit-review-container">
        <div className="columns">
          <div className="column is-two-thirds">
            <div className="submit-review-details">
              <div className="review-breadcrumb">
                <b>
                  <Link to={`/profile/${userID}`}>Profile</Link>{' '}
                  <span className="crumb-arrow">{'>'} </span> {'Upload'}
                </b>
              </div>
              <h2>Upload your profile picture</h2>
              <hr />
              <p>
                Use the image upload below to change your profile picture (File
                size should be less than 300kb)
              </p>
              <br />
            </div>
            <hr />
            <form onSubmit={handleSubmit}>
              <ImageUploadField
                value={formData.profileImage}
                name="profileImage"
                handleImageUrl={handleImageUrl}
                formData={formData}
              />
              <hr></hr>
              <div className="field is-grouped">
                <div className="control">
                  <button className="button" type="submit">
                    Submit
                  </button>
                </div>
                <div className="control">
                  <button
                    className="button"
                    type="button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="column"></div>
        </div>
      </div>
    </>
  )
}

export default EditProfileImage
