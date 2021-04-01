import axios from 'axios'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../../helpers/auth'
import { Link } from 'react-router-dom'
import Header from '../Header'

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
    window.alert('Your Pub has been deleted')
    history.push(`/profile/${userID}`)
  }

  const handleCancel = () => {
    history.push(`/pubs/${pubID}`)
  }

  return (
    <>
      <Header />
      <div className="submit-review-container">
        <div className="columns">
          <div className="column is-two-thirds">
            {' '}
            <div className="submit-review-details">
              <div className="review-breadcrumb">
                <b>
                  <Link to={`/landlord-profile/${userID}`}>Pub</Link>{' '}
                  <span className="crumb-arrow">{'>'} </span> {'Delete Pub'}
                </b>
              </div>
              <h2>Delete your Pub</h2>
              <hr />
              <p>Please read the message below before you delete your Pub</p>
              <br />
            </div>
            <div className="notification is-danger is-light">
              <p>
                {' '}
                WARNING!!! Once this pub is deleted, all associated data will be
                lost. If you are sure you wish to proceed, please click Delete
                My Pub. If not, click cancel to return to the pub page.
              </p>
              <button
                className="button delete-button is-danger"
                onClick={handleDelete}
              >
                Delete My Pub
              </button>
              <button
                className="button is-danger is-outlined"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div className="column"></div>
      </div>
    </>
  )
}

export default DeletePub
