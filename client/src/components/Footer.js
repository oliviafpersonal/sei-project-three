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
          </div>
          <div className="column">
            <p>
              <Link to="/landlord">
                <b>LANDLORD</b>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
