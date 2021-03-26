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

const PubShow = () => {
  const params = useParams()

  const [pub, setPub] = useState('')

  //prettier-ignore
  const {
    nameOfPub,
    image,
    description,
    averageRating,
    address,
    isPetFriendly,
    isOutsideSeating,
    isFoodServed,
    isLiveSports,
    reviews,



  } = pub

  console.log(pub)

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`/api/pubs/${params.id}`)
      setPub(response.data)
    }
    getData()
  }, [])

  if (!pub) return null
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
                <p>{averageRating}</p>
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
          <div className="card-rating">
            <div className="rating-star">
              <FontAwesomeIcon icon={faStar} />
            </div>
            <p>{averageRating}</p>
          </div>
          <div>
            <p>Availability</p>
          </div>
          <div>
            <p>Comfortability</p>
          </div>
          <div>
            <p>Price</p>
          </div>
          <div>
            {reviews.map((review) => {
              return <li key={review._id}>{review.text}</li>
            })}
          </div>
        </section>
      </div>
    </>
  )
}

export default PubShow
