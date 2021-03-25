import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBeer,
  faBars,
  faUserCircle,
  faSearch
} from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  return (
    <>
      <section className="hero is-large header-style">
        <header>
          <div className="columns">
            <div className="column is-two-thirds">
              <div className="logo">
                <FontAwesomeIcon icon={faBeer} />
                <span className="logo-space">Pubhub</span>
              </div>
            </div>
            <div className="column">
              <p className="header-links">Become a Landlord</p>
            </div>
            <div className="column left">
              <button className="hamburger-button button">
                <FontAwesomeIcon icon={faBars} />
                <span className="logo-space">
                  {' '}
                  <FontAwesomeIcon icon={faUserCircle} />
                </span>
              </button>
            </div>
          </div>
        </header>
        <div className="hero-body header-bg">
          <div className="search-bar">
            <form className="search-container">
              <div className="location">
                <label className="location-label">Location</label>
                <input
                  placeholder="Where are you drinking?"
                  className="search-input"
                ></input>
              </div>
              <button className="search-button button">
                <div className="search-icon">
                  <FontAwesomeIcon icon={faSearch} />
                </div>
              </button>
            </form>
          </div>
        </div>
        <div className="cta-container">
          <div className="header-cta">Made possible by Landlords </div>
        </div>
      </section>
    </>
  )
}

export default Header
