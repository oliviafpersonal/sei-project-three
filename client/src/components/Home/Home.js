import React, { useEffect } from 'react'
import Header from './Header'
import StickyHeader from '../StickyHeader'
import { Link } from 'react-router-dom'

const Home = () => {
  // const [ isSticky, setIsSticky ] = useState(false)

  useEffect(() => {
    const header = document.querySelector('.myHeader')
    const sticky = header.offsetTop
    const scrollCallBack = window.addEventListener('scroll', () => {
      if (window.pageYOffset > sticky) {
        header.classList.add('sticky')
        header.classList.remove('hide')
      } else {
        header.classList.add('hide')
      }
    })
    return () => {
      window.removeEventListener('scroll', scrollCallBack)
    }
  }, [])

  return (
    <div className="home-container">
      <div className="myHeader hide">
        <StickyHeader />
      </div>
      <Header />

      <main>
        <div className="content-container">
          <div className="pubs-heading">
            <h1>Top Locations</h1>
          </div>
          <div className="columns">
            <div className="column">
              <Link to="/pubs/filter-pubs/london">
                <img src="https://images.pexels.com/photos/1578332/pexels-photo-1578332.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"></img>
                <p>London</p>
              </Link>
            </div>
            <div className="column">
              <Link to="/pubs/filter-pubs/manchester">
                <img src="https://www.prolificnorth.co.uk/sites/default/files/styles/lightbox_large/public/images/news/manchester-cityscape0.jpg?itok=VjQDdTYJ"></img>
                <p>Manchester</p>
              </Link>
            </div>
            <div className="column">
              <Link to="/pubs/filter-pubs/cardiff">
                <img src="https://d4drivers.uk/wp-content/uploads/2020/03/Cardiff.jpg"></img>
                <p>Cardiff</p>
              </Link>
            </div>
          </div>
        </div>
        <section>
          <div className="share-box">
            <div className="columns">
              <div className="column">
                <div className="share-text">
                  <h1>Your world is worth sharing</h1>
                  <br />
                  <p>Turn your pub into your next opportunity</p>
                  <Link to="/landlord">
                    <button className="button">Become a Landlord</button>
                  </Link>
                </div>
              </div>
              <div className="column"></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
