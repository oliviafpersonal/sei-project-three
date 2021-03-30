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
    <div className="grid-container">
      {reviews.splice(0, displayNumber).map((review) => {
        //prettier-ignore
        const {
          reviewOwnerImage,
          reviewOwnerName,
          createdAt,
          _id,
          text,
          reviewOwner,
        } = review

        return (
          <div key={_id}>
            <div className="review-details-container">
              <div className="review-image">
                <img src={reviewOwnerImage}></img>
              </div>
              <div>
                <div>
                  <b>{reviewOwnerName}</b>
                </div>
                <div className="review-date">{convertTimestamp(createdAt)}</div>
              </div>
            </div>

            <div className="comment"> {text}</div>
            {userIsOwner(reviewOwner) && (
              <>
                <button className="button delete-review" onClick={handleToggle}>
                  Delete Review
                </button>
                {displayModal(isDeleteActive, ModalDummy, handleToggle)}
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default PubComments
