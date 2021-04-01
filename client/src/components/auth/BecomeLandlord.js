import React, { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBeer } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { userIsAuthenticated } from '../../helpers/auth'
import 'animate.css'

import Modal from '../Modal'
import LoginPub from '../auth/ModalLoginPub'

const BecomeLandlord = () => {
  const login = useRef(null)

  return (
    <div>
      <section className="landlord-header-bg hero is-medium">
        <br />
        <Link to={'/'}>
          <div className="logo">
            <FontAwesomeIcon icon={faBeer} />
            <span className="logo-space">Pubhub</span>
          </div>
        </Link>
        <div className="landlord-hero-body hero-body">
          <div className="animate__animated animate__fadeInUp">
            <h2>BECOME A LANDLORD</h2>
            <br />
            <h1>List your Pub on Pubhub and earn up to £200 a month*</h1>
            <br />

            {userIsAuthenticated() && (
              <Link to={'/landlord/signup'}>
                <button className="landlord-get-started button">
                  Get Started
                </button>
              </Link>
            )}
            {!userIsAuthenticated() && (
              <button
                onClick={() => login.current.open()}
                className="landlord-get-started button"
              >
                Login to Get Started
              </button>
            )}

            <br />
            <p>How we estimate your earnings potential</p>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="landlord-boxes columns">
          <div className="landlord-box column">
            <div className="landlord-content">
              <h1>Your next chapter, made possible by being a Landlord</h1>
            </div>
          </div>
          <div className="landlord-box column">
            <div className="landlord-content">
              <h5>Welcome what’s next</h5>
              <br />
              <p>
                Enjoy the flexibility of being your own boss, earn extra income,
                and make lifelong connections through being a Lardlord.
              </p>
            </div>
          </div>
          <div className="landlord-box column">
            <div className="landlord-content">
              <h5>Be a Landlord with confidence</h5>
              <br />
              <p>
                From 24/7 support and our helpful Landlord community, to custom
                tools, insights, and education, we’re invested in your success.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Modal ref={login}>
        <LoginPub />
      </Modal>
    </div>
  )
}

export default BecomeLandlord
