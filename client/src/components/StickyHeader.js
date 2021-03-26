import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBeer } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

// components

import Hamburger from './Hamburger'

const StickyHeader = () => {
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
              <Hamburger />
            </div>
          </div>
        </header>
      </section>
    </>
  )
}

export default StickyHeader
