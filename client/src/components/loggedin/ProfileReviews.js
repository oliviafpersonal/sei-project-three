import React from 'react'
import { Link } from 'react-router-dom'
import { userIsOwner } from '../../helpers/auth'
import { convertTimestamp } from '../../helpers/helperFunctions'

const ProfileReviews = ({ reviews, displayNumber }) => {
  return (
    <div className="profile-comment-container">
      {reviews.splice(0, displayNumber).map((review) => {
        const {
          //prettier-ignore
          // reviewOwnerName,
          createdAt,
          _id: reviewID,
          text,
          reviewOwner,
          pubName,
          pubID,
        } = review
        return (
          <div className="profile-comment " key={reviewID}>
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
              <Link to={`/pubs/${pubID}/reviews-delete/${reviewID}`}>
                <div>
                  <button className="button delete-review">
                    Delete Review
                  </button>
                </div>
              </Link>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ProfileReviews
