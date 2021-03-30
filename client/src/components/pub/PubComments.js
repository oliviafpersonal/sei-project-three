import React from 'react'
import { convertTimestamp } from '../../helpers/helperFunctions'

const PubComments = ({ reviews, displayNumber }) => {
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
          </div>
        )
      })}
    </div>
  )
}

export default PubComments
