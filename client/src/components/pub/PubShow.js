import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//prettier-ignore
import {
  faStar,
  faHeart,
  faUpload,
  faDog,
  faChair,
  faUtensils,
  faFutbol,
  faTrash,
  faPencilAlt
} from '@fortawesome/free-solid-svg-icons'
//components
import Header from '../Header'
import PubComments from './PubComments'
import { userIsAuthenticated, userIsOwner } from '../../helpers/auth'
const PubShow = () => {
  const { id } = useParams()
  // const [reviewNumber, setReviewNumber] = useState(6)
  // const [isShowReviewsActive, setIsShowReviewsActive] = useState(false)
  const [pub, setPub] = useState('')
  const [pubs, setPubs] = useState(null)
  //prettier-ignore
  // const handleButtonToggle = (event) => {
  //   const buttonName = event.target.name
  //   buttonName === 'submit-reviews-button'
  //     ? setIsSubmitActive(!isSubmitActive)
  //     : (setIsSubmitActive(false))
  // }

  // buttonName === 'show-reviews-button'
  // ? setIsShowReviewsActive(!isShowReviewsActive)
  // :

  // setIsShowReviewsActive(false)

  // console.log(isShowReviewsActive)
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

  // const handleToggle = (event) => {
  //   event.preventDefault()
  // setReviewNumber
  // }

  if (!pub || !pubs) return null
  const cityToCompare = pub.address.city
  const filterPubsByCity = pubs
    .filter((item) => item.address.city === cityToCompare)
    .filter((item) => item.nameOfPub !== pub.nameOfPub)

  function getRandom(arr, n) {
    const result = new Array(n)
    let len = arr.length
    const taken = new Array(len)
    if (n > len)
      throw new RangeError('getRandom: more elements taken than available')
    while (n--) {
      var x = Math.floor(Math.random() * len)
      result[n] = arr[x in taken ? taken[x] : x]
      taken[x] = --len in taken ? taken[len] : len
    }
    return result
  }

  return (
    <>
      <Header />

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
                  {userIsOwner(pubOwner) ? (
                    <>
                      <span className="icon-space">
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </span>
                      <Link to={`/pubs/${id}/edit`}>
                        <p>Edit</p>
                      </Link>
                      <span className="icon-space">
                        <FontAwesomeIcon icon={faTrash} />
                      </span>
                      <Link to={`/pubs/${id}/delete`}>
                        <p>Delete</p>
                      </Link>
                    </>
                  ) : (
                    <>
                      <span className="icon-space">
                        <FontAwesomeIcon icon={faUpload} />
                      </span>
                      <p>Share</p>
                      <span className="icon-space">
                        <FontAwesomeIcon icon={faHeart} />
                      </span>
                      <p>Save</p>
                    </>
                  )}
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
                      <p>
                        {' '}
                        {typeof averageRatings.averageAvailability === 'string'
                          ? averageRatings.averageAvailability
                          : averageRatings.averageAvailability.toFixed(1)}
                      </p>
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
                      <p>
                        {typeof averageRatings.averageComfortability ===
                        'string'
                          ? averageRatings.averageComfortability
                          : averageRatings.averageComfortability.toFixed(1)}
                      </p>
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
                      <p>
                        {' '}
                        {typeof averageRatings.averagePrice === 'string'
                          ? averageRatings.averagePrice
                          : averageRatings.averagePrice.toFixed(1)}
                      </p>
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
            <button
              className="reviews-button button"
              name="show-reviews-button"
              // onClick={handleButtonToggle}
            >{`Show all ${reviews.length} Reviews`}</button>

            {userIsAuthenticated() && !userIsOwner(pubOwner) && (
              <>
                <Link to={`/pubs/${id}/submit-review`}>
                  <button
                    className="reviews-button button"
                    name="submit-reviews-button"
                  >
                    Submit a Review
                  </button>
                </Link>
              </>
            )}
          </div>
        </section>
        <hr />
        {!userIsAuthenticated() && <p>hello</p>}

        <h2>More Pubs In {address.city}</h2>
        <br />
        {pub && (
          <div className="columns is-multiline">
            {getRandom(filterPubsByCity, 8).map((pub) => {
              return (
                <div
                  key={pub._id}
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
        <hr />
      </div>
    </>
  )
}
export default PubShow
