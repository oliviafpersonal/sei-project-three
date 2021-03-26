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
          <h3>{nameOfPub}</h3>

          <p>{description}</p>
        </div>
      </div>

      <hr />
    </div>
  )
}

export default PubCard
