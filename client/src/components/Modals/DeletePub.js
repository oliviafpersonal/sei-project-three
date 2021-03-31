import axios from 'axios'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../../helpers/auth'

const DeletePub = () => {

  const history = useHistory()
  const { pubID } = useParams()
  const userID = getTokenFromLocalStorage().sub
  console.log('pubID', pubID)


  const handleDelete = async (event) => {
    event.preventDefault()
    await axios.delete(`/api/pubs/${pubID}`, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    })
    history.push(`/profile/${userID}`)

  }


  const handleCancel = () => {
    history.push(`/pubs/${pubID}`)
  }



  return (
    <>
      <div className="notification is-danger is-light">
        <p> WARNING!!! Once this pub is deleted, all associated data will be lost. If you are sure you wish to proceed, please click Delete My Pub. If not, click cancel to return to the pub page.</p>
        <button className="button is-danger" onClick={handleDelete}>Delete My Pub</button>
        <button className="button is-danger is-outlined" onClick={handleCancel}>Cancel</button>
      </div>
    </>
  )
}

export default DeletePub
