import React from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'

//prettier-ignore
import {
  getPayloadFromToken,
  getTokenFromLocalStorage
} from '../../../helpers/auth'
import { Link } from 'react-router-dom'

//components
import Header from '../../Header'

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
      <Header />
      <div className="submit-review-container">
        <div className="columns">
          <div className="column is-two-thirds">
            <div className="submit-review-details">
              <div className="review-breadcrumb">
                <b>
                  <Link to={`/profile/${userID}`}>Profile</Link>{' '}
                  <span className="crumb-arrow">{'>'} </span> {'Delete Profile'}
                </b>
              </div>
              <h2>Delete your account</h2>
              <hr />
              <p>
                We are sad to see you go, but please read the message before you
                make your decision.
              </p>
              <br />
            </div>
            <div className="notification is-danger is-light">
              <p>
                WARNING!!! Once your account is deleted, all associated data
                will be lost. If you are sure you wish to proceed, please click
                Delete My Account. If not, click cancel to return to you profile
                page.
              </p>
              <br />
              <button
                className="button delete-button is-danger"
                onClick={handleDelete}
              >
                Delete My Account
              </button>
              <button
                className="button is-danger is-outlined"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="column"></div>
        </div>
      </div>
    </>
  )
}

export default DeleteProfile
