import React from 'react'

const PubComments = ({ reviews }) => {
  return (
    <div className="grid-container">
      {reviews.splice(0, 6).map((review) => {
        const reviewDate = Date.parse(review.createdAt)
        const newReviewDate = new Date(reviewDate)

        const months = [
          'Jan',
          'Feb',
          'Mar',
          'April',
          'May',
          'June',
          'July',
          'Aug',
          'Sept',
          'Oct',
          'Nov',
          'Dec'
        ]

        return (
          <div key={review._id}>
            <div className="review-details-container">
              <div className="review-image">
                <img src={review.reviewOwnerImage}></img>
              </div>
              <div>
                <div>
                  <b>{review.reviewOwnerName}</b>
                </div>
                <div className="review-date">
                  {months[newReviewDate.getMonth()] +
                    ' ' +
                    newReviewDate.getFullYear()}
                </div>
              </div>
            </div>

            <div className="comment"> {review.text}</div>
          </div>
        )
      })}
    </div>
  )
}

export default PubComments
