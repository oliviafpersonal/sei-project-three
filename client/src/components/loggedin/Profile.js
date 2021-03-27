import React, { useState } from 'react'
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
    <form onSubmit={handleSubmit}>
      <div>
        <ImageUploadField
          value={formdata.profileImage}
          name="profileImage"
          handleImageUrl={handleImageUrl}
        />
      </div>
    </form>
  )
}

export default Profile
