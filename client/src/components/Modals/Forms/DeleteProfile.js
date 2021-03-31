import React from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import { getPayloadFromToken, getTokenFromLocalStorage } from '../../../helpers/auth'

const DeleteProfile = () => {

  const history = useHistory()

  const { userID } = useParams()
  const handleDelete = async (event) => {
    event.preventDefault()
    await axios.delete(`/api/users/${getPayloadFromToken().sub}`, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    })
    history.push('/')
    handleLogout()
  }


  const handleCancel = () => {
    history.push(`/profile/${userID}`)
  }
  const handleLogout = () => {
    window.localStorage.removeItem('token')
    window.alert('Your Account has been deleted')
    history.push('/')
  }


  return (
    <>
      <div className="notification is-danger is-light">
        <p> WARNING!!! Once your account is deleted, all associated data will be lost. If you are sure you wish to proceed, please click Delete My Account. If not, click cancel to return to you profile page.</p>
        <button className="button is-danger" onClick={handleDelete}>Delete My Account</button>
        <button className="button is-danger is-outlined" onClick={handleCancel}>Cancel</button>
      </div>
    </>
  )
}

export default DeleteProfile
