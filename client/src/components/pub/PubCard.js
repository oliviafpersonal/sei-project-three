import React from 'react'
import { Link } from 'react-router-dom'


const PubCard = ({ _id, nameOfPub, image, description }) => {
  return (
    <div className="column">
      <Link to={`pubs/${_id}`}>
        <h4>{nameOfPub}</h4>
        <img className="pubcard-image" src={image} alt={nameOfPub} />
        <p>{description}</p>
      </Link>

    </div>
  )
}

export default PubCard
