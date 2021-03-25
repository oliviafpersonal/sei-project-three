import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons'

const Hamburger = () => {
  return (
    <div>
      <button className="hamburger-button-hoc button">
        <FontAwesomeIcon icon={faBars} />
        <span className="logo-space">
          <FontAwesomeIcon icon={faUserCircle} />
        </span>
      </button>
    </div>
  )
}

export default Hamburger
