import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams /*, Link*/ } from 'react-router-dom'
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
import Review from '../Forms/Review'
import { displayModal } from '../../helpers/helperFunctions'
import ModalDummy from '../Forms/ModalDummy'


const PubShow = () => {
  const { id } = useParams()
  const [isSubmitActive, setIsSubmitActive] = useState(false)
  const [isShowReviewsActive, setIsShowReviewsActive] = useState(false)
  const [pub, setPub] = useState('')


  const handleButtonToggle = (event) => {
    const buttonName = event.target.name
    buttonName === 'show-reviews-button' ? setIsShowReviewsActive(!isShowReviewsActive)
      : buttonName === 'submit-reviews-button' ?
        setIsSubmitActive(!isSubmitActive)
        : (setIsSubmitActive(false), setIsShowReviewsActive(false))
  }
  console.log(id)
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
    getData()
  }, [])

  const handleToggle = (event) => {
    event.preventDefault()
    setIsSubmitActive(!isSubmitActive)
  }

  if (!pub) return null
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
            <PubComments reviews={reviews} />
          </div>
          <div className="reviews-button-container">
            <button className="reviews-button button" name="show-reviews-button" onClick={handleButtonToggle}>{`Show all ${reviews.length} Reviews`}</button> 
            {displayModal(isShowReviewsActive, ModalDummy, handleButtonToggle)}
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
      </div>

    </>
  )
}

export default PubShow
