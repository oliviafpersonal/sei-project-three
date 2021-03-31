import axios from 'axios'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { getTokenFromLocalStorage } from '../../../helpers/auth'
import { ImageUploadField } from '../../ImageUploadField'

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
    console.log(formData)
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
    <form onSubmit={handleSubmit}>
      <ImageUploadField
        value={formData.profileImage}
        name="profileImage"
        handleImageUrl={handleImageUrl}
        formData={formData}
      />

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" type="submit">
            Submit
          </button>
        </div>
        <div className="control">
          <button
            className="button is-link"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}

export default EditProfileImage
