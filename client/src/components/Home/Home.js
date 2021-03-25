import React from 'react'
import Header from './Header'

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <main>
        <div className="content-container">
          <div className="pubs-heading">
            <h1>Pubs Nearby</h1>
          </div>
          <div className="columns">
            <div className="column">
              <img src="https://www.telegraphmoorgate.co.uk/-/media/sites/microsites/t/the-telegraph-_-p112/images/2019-ray/drink-gallery/01-telegraph-17092019-93.ashx?w=1024"></img>
              <p>Cool Pubs</p>
            </div>
            <div className="column">
              <img src="https://static.standard.co.uk/s3fs-public/thumbnails/image/2018/12/06/11/the-old-bank-of-england-15.jpg?width=990"></img>
              <p>Old pubs</p>
            </div>
            <div className="column">
              <img src="https://static.standard.co.uk/s3fs-public/thumbnails/image/2020/02/11/13/ship-shovell-pub.jpg?width=1368"></img>
              <p>Cute Pubs</p>
            </div>
          </div>
        </div>
        <section>
          <div className="share-box">
            <div className="columns">
              <div className="column">
                <div className="share-text">
                  <h1>Your world is worth sharing</h1>
                  <p>Turn your pub into your next opportunity</p>
                  <button className="button">Become a Landlord</button>
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
