import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { userIsAuthenticated } from '../helpers/auth'

const Hamburger = () => {
  const history = useHistory()

  const clickHandler = (e) => {
    e.currentTarget.classList.toggle('is-active')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }

  const location = useLocation()
  useEffect(() => {}, [location.pathname])



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
            { !userIsAuthenticated() &&
              <>
                <Link to="/login" className="dropdown-item">
              Login
                </Link>

                <Link to="/signup" className="dropdown-item">
                Register
                </Link>
              </>
            }


            {userIsAuthenticated() && 
            <>
              <hr className="dropdown-divider" />
              <Link to="/profile" className="dropdown-item">
                Profile
              </Link>
            
              <hr className="dropdown-divider" />
              <div className="dropdown-item stretch">
                <a>New Pub Crawl</a>
              </div>

              <hr className="dropdown-divider" />
              <div className="dropdown-item" onClick={handleLogout}>
                <a>Logout</a>
              </div>
            </>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Hamburger
