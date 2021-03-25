import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBeer, faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  return (
    <>
      <section className="hero is-large header-style-hoc">
        <header>
          <div className="columns">
            <div className="column is-two-thirds">
              <div className="logo-brand">
                <FontAwesomeIcon icon={faBeer} />
                <span className="logo-space">Pubhub</span>
              </div>
            </div>
            <div className="column">
              <p className="header-links-hoc">Become a Landlord</p>
            </div>
            <div className="column left">
              <button className="hamburger-button-hoc button">
                <FontAwesomeIcon icon={faBars} />
                <span className="logo-space">
                  {' '}
                  <FontAwesomeIcon icon={faUserCircle} />
                </span>
              </button>
            </div>
          </div>
        </header>
      </section>
    </>
  )
}

export default Header
