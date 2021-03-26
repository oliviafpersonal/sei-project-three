import React from 'react'
import { Link } from 'react-router-dom'

const PubCard = ({ _id, nameOfPub, image, description }) => {
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
        </div>
      </div>

      <hr />
    </div>
  )
}

export default PubCard
