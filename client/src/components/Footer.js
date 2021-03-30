import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <div className="footer-body">
        <div className="columns">
          <div className="column">
            <p>
              <b>ABOUT</b>
            </p>

            <ul>
              <li>How Pubhub works</li>
              <li>Pubhub Plus</li>
              <li>Pubhub for work</li>
              <li>Careers</li>
            </ul>
          </div>
          <div className="column">
            <p>
              <b>COMMUNITY</b>
            </p>
            <ul>
              <li>Diversity & Belonging</li>
              <li>Accessibility</li>
              <li>Pubhub Associates</li>
              <li>Frontline Pubs</li>
              <li>Guest Referrals</li>
              <li>Pubhub.co.uk</li>
            </ul>
          </div>
          <div className="column">
            <p>
              <b>LANDLORD</b>
            </p>

            <ul>
              {' '}
              <Link to="/landlord">
                <li>Become a landlord</li>
              </Link>
              <li>Referrals</li>
            </ul>
          </div>
        </div>
        <hr />
        <p>© 2021 Pubhub, Inc.</p>
      </div>
    </footer>
  )
}

export default Footer
