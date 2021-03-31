import axios from 'axios'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../../helpers/auth'
import { Link } from 'react-router-dom'
//components
import Header from '../Header'

const DeleteReview = () => {
  const history = useHistory()
  const userID = getTokenFromLocalStorage().sub
  const { pubID, reviewID } = useParams()

  console.log('pubID', pubID)
  console.log('reviewid', reviewID)

  const handleDelete = async (event) => {
    event.preventDefault()
    await axios.delete(`/api/pubs/${pubID}/reviews/${reviewID}`, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    })
    window.alert('your review has been deleted')
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
                  <span className="crumb-arrow">{'>'} </span> {'Delete Review'}
                </b>
              </div>
              <h2>Delete your comment</h2>
              <hr />
              <p>
                Please read the message below before you delete your comment
              </p>
              <br />
            </div>
            <div className="notification is-danger is-light">
              <p>
                {' '}
                WARNING!!! If you delete this review it is gone for good. If you
                are sure you wish to proceed, please click Delete Review. If
                not, click cancel to return to you profile page.
              </p>
              <br />
              <button
                className="button delete-button is-danger"
                onClick={handleDelete}
              >
                Delete Review
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

export default DeleteReview
