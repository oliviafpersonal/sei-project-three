import React, { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { getPayloadFromToken, userIsAuthenticated } from '../helpers/auth'
import Modal from './Modal'
import Login from './auth/ModalLogin'
import Register from './auth/ModalRegister'

const Hamburger = () => {
  const history = useHistory()
  const userID = getPayloadFromToken().sub
  const clickHandler = (e) => {
    e.currentTarget.classList.toggle('is-active')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }

  const location = useLocation()
  useEffect(() => {}, [location.pathname])

  const modal = useRef(null)
  const register = useRef(null)

  return (
    <>
      <div className="dropdown is-right" onClick={clickHandler}>
        <div className="dropdown-trigger">
          <button
            className="hamburger-button-hoc button"
            aria-haspopup="true"
            aria-controls="dropdown-menu4"
          >
            <FontAwesomeIcon icon={faBars} className="fa-1x" />
            <span className="logo-space">
              <FontAwesomeIcon icon={faUserCircle} className="fa-2x" />
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu1" role="menu">
          <div className="dropdown-content dropdown-shape">
            {!userIsAuthenticated() && (
              <>
                <Link className="dropdown-item">
                  <div onClick={() => modal.current.open()}>Login</div>
                </Link>
                <Link className="dropdown-item">
                  <div onClick={() => register.current.open()}>Register</div>
                </Link>
              </>
            )}

            {userIsAuthenticated() && (
              <>
                <Link to={`/profile/${userID}`} className="dropdown-item">
                  Profile
                </Link>
                <Link
                  to={`/landlord-profile/${userID}`}
                  className="dropdown-item"
                >
                  Landlord Profile
                </Link>

                <hr className="dropdown-divider" />

                <Link
                  to={`/profile/${userID}/saved-pubs`}
                  className="dropdown-item"
                >
                  Saved Pubs
                </Link>

                <hr className="dropdown-divider" />
                <div className="dropdown-item" onClick={handleLogout}>
                  <a>Logout</a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Modal ref={modal}>
        <Login />
      </Modal>
      <Modal ref={register}>
        <Register />
      </Modal>
    </>
  )
}

export default Hamburger
