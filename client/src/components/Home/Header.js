import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBeer, faSearch } from '@fortawesome/free-solid-svg-icons'

/// components

import Hamburger from '../Hamburger'

const Header = () => {
  return (
    <>
      <section className="hero is-large header-style">
        <header>
          <div className="columns">
            <div className="column is-two-thirds">
              <Link to={'/'}>
                <div className="logo">
                  <FontAwesomeIcon icon={faBeer} />
                  <span className="logo-space">Pubhub</span>
                </div>{' '}
              </Link>
            </div>
            <div className="column">
              <p className="header-links">Become a Landlord</p>
            </div>
            <div className="column left">
              <Hamburger />
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
