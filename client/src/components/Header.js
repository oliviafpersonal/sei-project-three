import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBeer, faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
const Header = () => {
  const clickHandler = (e) => {
    e.currentTarget.classList.toggle('is-active')
  }

  return (
    <>
      <section className="header-style-hoc">
        <header>
          <div className="columns">
            <div className="column is-two-thirds">
              <Link to={'/'}>
                <div className="logo-brand">
                  <FontAwesomeIcon icon={faBeer} />
                  <span className="logo-space">Pubhub</span>
                </div>
              </Link>
            </div>
            <div className="column">
              <p className="header-links-hoc">Become a Landlord</p>
            </div>
            <div className="column left">
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
                <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                  <div className="dropdown-content">
                    <a href="#" className="dropdown-item">
                      Overview
                    </a>
                    <a href="#" className="dropdown-item">
                      Modifiers
                    </a>
                    <a href="#" className="dropdown-item">
                      Grid
                    </a>
                    <a href="#" className="dropdown-item">
                      Form
                    </a>
                    <a href="#" className="dropdown-item">
                      Elements
                    </a>
                    <a href="#" className="dropdown-item">
                      Components
                    </a>
                    <a href="#" className="dropdown-item">
                      Layout
                    </a>
                    <hr className="dropdown-divider" />
                    <a href="#" className="dropdown-item">
                      More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </section>
    </>
  )
}

export default Header
