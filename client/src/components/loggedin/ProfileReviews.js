/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { userIsOwner } from '../../helpers/auth'
import { convertTimestamp } from '../../helpers/helperFunctions'

const PubComments = ({ reviews, displayNumber }) => {
  const [isDeleteActive, setisDeleteActive] = useState(false)
  const handleToggle = () => {
    setisDeleteActive(!isDeleteActive)
  }
  return (
    <div className="profile-comment-container">
      {reviews.splice(0, displayNumber).map((review) => {
        console.log(review)
        //prettier-ignore
        const {
          //prettier-ignore
          // reviewOwnerName,
          createdAt,
          _id,
          text,
          reviewOwner,
          pubName,
        } = review

        return (
          <div className="profile-comment " key={_id}>
            <div className="profile-review-details-container">
              <div>
                <div>
                  <b>{pubName}</b>
                </div>
                <div className="review-date">{convertTimestamp(createdAt)}</div>
              </div>
            </div>

            <div className="comment"> {text}</div>
            {userIsOwner(reviewOwner) && (
              <>
                <button className="button delete-review">
                  Delete Review
                </button>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default PubComments
