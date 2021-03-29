import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { getPayloadFromToken, getTokenFromLocalStorage } from '../../../helpers/auth'
import { displayModal } from '../../../helpers/helperFunctions'
import DeleteMessage from '../DeleteMessage'

const DeleteProfile = () => {
  const history = useHistory()
  console.log(history)

  const [isDeleted, setIsDeleted] = useState(false)

  const handleDelete = async (event) => {
    event.preventDefault()
    const response = await axios.delete(`/api/users/${getPayloadFromToken().sub}`, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    })
    console.log(response)
    //history.push('/')
    setIsDeleted(!isDeleted)
    handleLogout()
  }


  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }


  return (
    <>
      <div className="notification is-danger is-light">
        <p> WARNING!!! Once your account is deleted, all associated data will be lost. If you are sure you wish to proceed, please click Delete My Account. If not, click the close button on the top right to cancel.</p>
        <button className="button is-danger" onClick={handleDelete}>Delete My Account</button>

        {displayModal(isDeleted, DeleteMessage)}


      </div>
    </>
  )
}

export default DeleteProfile
