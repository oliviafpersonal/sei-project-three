import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons'
// import { Link } from 'react-router-dom'
const Hamburger = () => {
  const clickHandler = (e) => {
    e.currentTarget.classList.toggle('is-active')
  }

  return (
    <>
      <div className="dropdown is-right" onClick={clickHandler}>
        <div className="dropdown-trigger">
          <button
            className="hamburger-button-hoc button"
            aria-haspopup="true"
            aria-controls="dropdown-menu4"
          >
            <FontAwesomeIcon icon={faBars} />
            <span className="logo-space">
              <FontAwesomeIcon icon={faUserCircle} />
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu1" role="menu">
          <div className="dropdown-content dropdown-shape">
            <a href="#" className="dropdown-item">
              Login
            </a>
            <a href="#" className="dropdown-item">
              Register
            </a>

            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              Profile
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hamburger
