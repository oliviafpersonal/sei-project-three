import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBeer, faSearch } from '@fortawesome/free-solid-svg-icons'

/// components

import Hamburger from '../Hamburger'

const Header = () => {
  const [filterValue, setFilterValue] = useState('')
  const history = useHistory()
  const handleChange = (event) => {
    const value = event.target.value
    setFilterValue(value)

  }
  const navigateToFiltered = (city) => {
    history.push(`/pubs/filter-pubs/${city}`)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    navigateToFiltered(filterValue)
  }

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
              <Link to="/landlord">
                <p className="header-links">Become a Landlord</p>
              </Link>
            </div>
            <div className="column left">
              <Hamburger />
            </div>
          </div>
        </header>
        <div className="hero-body header-bg">
          <div className="search-bar">
            <form className="search-container" onSubmit={handleSubmit}>
              <div className="location">
                <label className="location-label">Location</label>
                <input
                  placeholder="Where are you drinking?"
                  className="search-input"
                  onChange={handleChange}
                ></input>
              </div>
              <div className="location">
                <label className="location-label">Search Pubs</label>
                <input
                  placeholder="Got a specific pub in mind?"
                  className="search-input"
                  onChange={handleChange}
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
