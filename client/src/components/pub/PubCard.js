import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const PubCard = ({ _id, nameOfPub, image, description, averageRating }) => {
  return (
    <div className="column">
      <div className="columns">
        <div className="column">
          <Link to={`pubs/${_id}`}>
            <img className="pubcard-image" src={image} alt={nameOfPub} />
          </Link>
        </div>
        <div className="column">
          <h4>{nameOfPub}</h4>
          <hr className="card-hr" />
          <p>{description.substring(0, 100)}...</p>
          <div className="card-rating">
            <div className="rating-star">
              <FontAwesomeIcon icon={faStar} />
            </div>
            <p>{averageRating}</p>
          </div>
        </div>
      </div>

      <hr />
    </div>
  )
}

export default PubCard
