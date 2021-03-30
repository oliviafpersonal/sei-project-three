/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { userIsOwner } from '../../helpers/auth'
import { convertTimestamp, displayModal } from '../../helpers/helperFunctions'
import ModalDummy from '../Modals/Forms/ModalDummy'

const PubComments = ({ reviews, displayNumber }) => {
  const [isDeleteActive, setisDeleteActive] = useState(false)
  const handleToggle = () => {
    setisDeleteActive(!isDeleteActive)
  }
  return (
    <div className="profile-comment-container">
      <div className="profile-comment">
        {reviews.splice(0, displayNumber).map((review) => {
          //prettier-ignore
          const {
            reviewOwnerName,
            createdAt,
            _id,
            text,
            reviewOwner,
          } = review

          return (
            <div key={_id}>
              <div className="profile-review-details-container">
                <div>
                  <div>
                    <b>{reviewOwnerName}</b>
                  </div>
                  <div className="review-date">
                    {convertTimestamp(createdAt)}
                  </div>
                </div>
              </div>

              <div className="comment"> {text}</div>
              {userIsOwner(reviewOwner) && (
                <>
                  <button
                    className="button delete-review"
                    onClick={handleToggle}
                  >
                    Delete Review
                  </button>
                  {displayModal(isDeleteActive, ModalDummy, handleToggle)}
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PubComments
