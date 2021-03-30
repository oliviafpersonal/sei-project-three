import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar,
  faHeart,
  faUpload,
  faDog,
  faChair,
  faUtensils,
  faFutbol
} from '@fortawesome/free-solid-svg-icons'

//components
import Header from '../Header'
import PubComments from './PubComments'
import { userIsAuthenticated, userIsOwner } from '../../helpers/auth'
import Review from '../Modals/Forms/Review'
import { displayModal } from '../../helpers/helperFunctions'
import DisplayAllReviews from '../Modals/DisplayAllReviews'


const PubShow = () => {
  const { id } = useParams()
  const [isSubmitActive, setIsSubmitActive] = useState(false)
  const [isShowReviewsActive, setIsShowReviewsActive] = useState(false)
  const [pub, setPub] = useState('')
  const [pubs, setPubs] = useState(null)
  


  const handleButtonToggle = (event) => {
    const buttonName = event.target.name
    buttonName === 'show-reviews-button' ? setIsShowReviewsActive(!isShowReviewsActive)
      : buttonName === 'submit-reviews-button' ?
        setIsSubmitActive(!isSubmitActive)
        : (setIsSubmitActive(false), setIsShowReviewsActive(false))
  }
  //prettier-ignore
  const {
    nameOfPub,
    image,
    description,
    averageRatings,
    address,
    isPetFriendly,
    isOutsideSeating,
    isFoodServed,
    isLiveSports,
    reviews,
    pubOwner,
  } = pub

  console.log(pub)

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`/api/pubs/${id}`)
      setPub(response.data)
    }
    const getPubs = async () => {
      const { data } = await axios.get('/api/pubs')
      setPubs(data)
    }
    getData()
    getPubs()
    window.scroll({
      top: 100,
      left: 100,
      behavior: 'auto',
    })

  }, [id])
  //! math.random between 0 and filtered length, * 3, display the pub from filteredPubs at index of the three random numbers 
  const handleToggle = (event) => {
    event.preventDefault()
    setIsSubmitActive(!isSubmitActive)
  }
  [5,9,45]

  
  if (!pub || !pubs) return null
  const cityToCompare = pub.address.city
  const filterPubsByCity = pubs
    .filter(item => item.address.city === cityToCompare)
    .filter(item => item.nameOfPub !== pub.nameOfPub)
  
  const citiesToDisplay = filterPubsByCity.slice(0,4)
  console.log('🚀 ~ file: PubShow.js ~ line 85 ~ PubShow ~ citiesToDisplay', citiesToDisplay)

  // const location = useLocation()
  // useEffect(() => {}, [location.pathname])
  
  return (
    <>
      <Header />
      {console.log(
        'typeofe averag>>>>',
        typeof averageRatings.averageComfortability === 'string'
      )}
      <div className="pub-show-container">
        <div className="section">
          <div className="columns">
            <div className="column">
              <h2>{nameOfPub}</h2>
              <div className="card-rating">
                <div className="rating-star">
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <p>{averageRatings.averageOverall}</p>
                <p className="address">
                  {`${address.line1} 
                    ${address.line2} 
                    ${address.town} 
                    ${address.city} 
                    ${address.postCode}`}
                </p>
              </div>
            </div>
            <div className="column align-right">
              <div className="share-options">
                <div></div>
                <div className="share-align">
                  <p>
                    <span className="icon-space">
                      <FontAwesomeIcon icon={faUpload} />
                    </span>
                    Share
                  </p>
                  <span className="icon-space">
                    <FontAwesomeIcon icon={faHeart} />
                  </span>
                  <p>Save</p>
                </div>
              </div>
            </div>
          </div>

          <img className="show-image" src={image}></img>
          <hr />
          <div className="columns">
            <div className="column">
              <p>{description}</p>
            </div>
            <div className="column">
              {isPetFriendly && (
                <div className="benefits">
                  <div className="">
                    <div className="icon-align">
                      <span className="desc-icon">
                        <FontAwesomeIcon icon={faDog} className="fa-2x" />
                      </span>
                    </div>
                  </div>
                  <div className="">
                    <p>
                      <b>Dog Friendly</b>
                    </p>
                    <p>This pub is a great place to bring your dog</p>
                  </div>
                </div>
              )}
              {isOutsideSeating && (
                <div className="benefits">
                  <div className="">
                    <div className="icon-align">
                      <span className="desc-icon">
                        <FontAwesomeIcon icon={faChair} className="fa-2x" />
                      </span>
                    </div>
                  </div>
                  <div className="">
                    <p>
                      <b>Outdoor Seating</b>
                    </p>
                    <p>
                      This pub has wonderful outdoor seating for when there is
                      nice weather!
                    </p>
                  </div>
                </div>
              )}
              {isFoodServed && (
                <div className="benefits">
                  <div className="">
                    <div className="icon-align">
                      <span className="desc-icon">
                        <FontAwesomeIcon icon={faUtensils} className="fa-2x" />
                      </span>
                    </div>
                  </div>
                  <div className="">
                    <p>
                      <b>Food served</b>
                    </p>
                    <p>
                      This pub has amazing food, great to share with friends and
                      family!
                    </p>
                  </div>
                </div>
              )}
              {isLiveSports && (
                <div className="benefits">
                  <div className="">
                    <div className="icon-align">
                      <span className="desc-icon">
                        <FontAwesomeIcon icon={faFutbol} className="fa-2x" />
                      </span>
                    </div>
                  </div>
                  <div className="">
                    <p>
                      <b>Live Sports</b>
                    </p>
                    <p>Come in for exilerating live sports!</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <hr />
        <section className="reviews">
          <div className="card-rating ">
            <div className="rating-star2">
              <FontAwesomeIcon icon={faStar} className="fa-1x" />
            </div>
            <p className="overall-rating">
              {averageRatings.averageOverall}
              {`(${reviews.length} reviews)`}
            </p>
          </div>
          <div className="average-ratings-container">
            <div className="columns">
              <div className="column">
                <div className="columns">
                  <div className="column">
                    <p>
                      <b>Availability</b>
                    </p>
                  </div>
                  <div className="column">
                    <div className="range">
                      <progress
                        type="range"
                        min="0"
                        max="5"
                        value={
                          typeof averageRatings.averageAvailability === 'string'
                            ? 0
                            : averageRatings.averageAvailability.toFixed(1)
                        }
                        className="slider"
                        id="myRange"
                      ></progress>
                      <p> {averageRatings.averageAvailability}</p>
                    </div>
                  </div>
                </div>

                <div className="columns">
                  <div className="column">
                    <p>
                      <b>Comfortability</b>
                    </p>
                  </div>
                  <div className="column">
                    <div className="range">
                      <progress
                        type="range"
                        min="0"
                        max="5"
                        value={
                          typeof averageRatings.averageComfortability ===
                          'string'
                            ? 0
                            : averageRatings.averageComfortability.toFixed(1)
                        }
                        className="slider"
                        id="myRange"
                      ></progress>
                      <p>{averageRatings.averageComfortability}</p>
                    </div>
                  </div>
                </div>
                <div className="columns">
                  <div className="column">
                    <p>
                      <b>Price</b>
                    </p>
                  </div>
                  <div className="column">
                    <div className="range">
                      <progress
                        type="range"
                        min="0"
                        max="5"
                        value={
                          typeof averageRatings.averagePrice === 'string'
                            ? 0
                            : averageRatings.averagePrice.toFixed(1)
                        }
                        className="slider"
                        id="myRange"
                      ></progress>
                      <p> {averageRatings.averagePrice}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column"></div>
            </div>
          </div>
          <div className="comments">
            <PubComments reviews={reviews} displayNumber={6} />
          </div>
          <div className="reviews-button-container">
            <button className="reviews-button button" name="show-reviews-button" onClick={handleButtonToggle}>{`Show all ${reviews.length} Reviews`}</button> 
            {displayModal(isShowReviewsActive, DisplayAllReviews, handleButtonToggle)}
          </div>
          {userIsAuthenticated() && !userIsOwner(pubOwner) &&
            <>
              <div className="reviews-button-container">
                <button className="reviews-button button" name="submit-reviews-button" onClick={handleToggle}>Submit a Review</button>
              </div>
              { displayModal(isSubmitActive, Review, handleToggle) }
            </>
          }
        </section>
        <hr />

        {!userIsAuthenticated() && <p>hello</p>} 
        <hr />
        <h2>More Pubs In {address.city}</h2>
        <br />
        {pub && (
          <div className="columns is-multiline">
            {citiesToDisplay.map(pub =>{
              return (
                <div
                  key={pub}
                  className="column is-one-quarter-desktop is-one-third-tablet"
                >
                  <Link to={`/pubs/${pub.id}`}>
                    <div className="card">
                      <div className="card-image ">
                        <figure className="image resize image-is-1by1">
                          <img src={pub.image} alt={pub.nameOfPub} />
                        </figure>
                      </div>
                      <div className="card-header ">
                        <div className="card-header-title">{pub.nameOfPub}</div>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        )} 
      </div>
    </>
  )
}

export default PubShow
