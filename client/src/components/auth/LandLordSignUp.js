/*eslint-disable no-unused-vars*/

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../../helpers/helperFunctions'

import drinks from '../../styles/assets/drinks.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faDog,
  faChair,
  faUtensils,
  faFutbol
} from '@fortawesome/free-solid-svg-icons'

// const { Client } = require('@ideal-postcodes/core-axios')
// const client = new Client({ api_key: 'ak_kmtc4fdm8RWTEGal0A9zsXeRXQm0s' })

// const findAddress = async () => {
//   const { IdpcRequestFailedError } = Client.errors

//   try {
//     const address = await client.lookupAddress({ query: 'N13 4NT' })
//     console.log(address)
//   } catch (error) {
//     if (error instanceof IdpcRequestFailedError) {
//       // IdpcRequestFailedError indicates a 402 response code
//       // Possibly the key balance has been depleted
//     }
//   }
// }

// findAddress()

const LandLordSignUp = () => {
  // const [steps, setSteps] = useState('')
  const history = useHistory()

  const [formData, setFormData] = useState({
    lineone: '',
    linetwo: '',
    town: '',
    city: '',
    postcode: '',
    description: '',
    desscription: '',
    
    

  })

  // console.log(steps, setSteps)

  useEffect(() => {
    return () => {
      const hideFooter = () => {
        const footer = document.querySelector('footer')

        footer.classList.add('hide')
      }
      hideFooter()
    }
  }, [])

  const clickHandler = (e) => {
    e.preventDefault()

    const currentStep = document.querySelector('.step-one')
    const nextStep = document.querySelector('.step-two')

    const currentButton = document.querySelector('.button-one')
    const nextButton = document.querySelector('.button-two')

    const backButton = document.querySelector('.back-one')
    const nextBackButton = document.querySelector('.backtwo')

    currentStep.classList.add('hide')
    currentButton.classList.add('hide')
    backButton.classList.add('hide')

    nextStep.classList.remove('hide')
    nextButton.classList.remove('hide')
    nextBackButton.classList.remove('hide')
  }

  const backOne = (e) => {
    e.preventDefault()

    history.push('/landlord')
  }

  const clickHandlerTwo = (e) => {
    e.preventDefault()

    const currentStep = document.querySelector('.step-two')
    const nextStep = document.querySelector('.step-three')
    const currentButton = document.querySelector('.button-two')
    const nextButton = document.querySelector('.button-three')
    const backButton = document.querySelector('.backtwo')
    const nextBackButton = document.querySelector('.backthree')

    currentStep.classList.add('hide')
    currentButton.classList.add('hide')
    backButton.classList.add('hide')
    nextStep.classList.remove('hide')
    nextButton.classList.remove('hide')

    nextBackButton.classList.remove('hide')
  }

  const backTwo = (e) => {
    e.preventDefault()

    const currentStep = document.querySelector('.step-one')
    const nextStep = document.querySelector('.step-two')

    const currentButton = document.querySelector('.button-one')
    const nextButton = document.querySelector('.button-two')

    const backButton = document.querySelector('.back-one')
    const nextBackButton = document.querySelector('.backtwo')

    currentStep.classList.remove('hide')
    currentButton.classList.remove('hide')
    backButton.classList.remove('hide')

    nextStep.classList.add('hide')
    nextButton.classList.add('hide')
    nextBackButton.classList.add('hide')
  }

  const backThree = (e) => {
    e.preventDefault()

    const currentStep = document.querySelector('.step-two')
    const nextStep = document.querySelector('.step-three')
    const currentButton = document.querySelector('.button-two')
    const nextButton = document.querySelector('.button-three')
    const backButton = document.querySelector('.backtwo')
    const nextBackButton = document.querySelector('.backthree')

    currentStep.classList.remove('hide')
    currentButton.classList.remove('hide')
    backButton.classList.remove('hide')
    nextStep.classList.add('hide')
    nextButton.classList.add('hide')

    nextBackButton.classList.add('hide')
  }

  return (
    <div className="landlord-sign-container container">
      <div className="columns">
        <div className="landlord-sign-up column">
          <h1>Hi, Username! Lets get started Listing your Pub</h1>
          <br></br>

          <form>
            <div className="step-one">
              <b>STEP 1</b>
              <h2>Where is your Pub located?</h2>
              {//<br />
                //<input className="input"></input>
                //<br />
              }

              <h2>Line 1</h2>
              <input className="input"></input>
              <br />
              <h2>Line 2</h2>
              <input className="input"></input>
              <br />
              <h2>Town</h2>
              <input className="input"></input>
              <br />
              <h2>City</h2>
              <input className="input"></input>
              <br />
              <h2>Postcode</h2>
              <input className="input"></input>
              <br />
              <h2>Description</h2>
              <input className="textarea"></input>
              <br />
            </div>
            <div className="form-nav">
              <div className="back-one back-button">
                <p onClick={backOne}>{'<< Back'}</p>
              </div>

              <button
                className="button-one landlord-sign-up-button button"
                onClick={clickHandler}
              >
                Continue
              </button>
            </div>

            <div className="hide step-two">
              <b>STEP 2</b>
              <h2>What are your pubs features?</h2>
              <br />
              <div className="feature-checkbox">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={faDog} className="fa-2x" />
                </div>
                <div className="feature-text">
                  <p>Is your pub dog friendly ?</p>
                  <input type="checkbox" className="checkbox" value="true" />
                </div>
              </div>
              <div className="feature-checkbox">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={faChair} className="fa-2x" />
                </div>
                <div className="feature-text">
                  <p>Do you have outdoor seating at your pub ?</p>
                  <input type="checkbox" className="checkbox" value="true" />
                </div>
              </div>
              <div className="feature-checkbox">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={faUtensils} className="fa-2x" />
                </div>
                <div className="feature-text">
                  <p>Do you serve food at your pub ?</p>
                  <input type="checkbox" className="checkbox" value="true" />
                </div>
              </div>
              <div className="feature-checkbox">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={faFutbol} className="fa-2x" />
                </div>
                <div className="feature-text">
                  <p>Do you your show live sports at your pub?</p>
                  <input type="checkbox" className="checkbox" value="true" />
                </div>
              </div>
            </div>

            <div className="form-nav">
              <div className="hide backtwo back-button">
                <p onClick={backTwo}> {'<< Back'}</p>
              </div>
              <button
                className="hide button-two landlord-sign-up-button button"
                onClick={clickHandlerTwo}
              >
                Next
              </button>
            </div>

            <div className=" hide step-three">
              <b>STEP 3</b>
              <h2>Lets see what your pub looks like?</h2>
              <br />
            </div>
            <div className="form-nav">
              <div className="hide backthree back-button">
                <p onClick={backThree}> {'<< Back'}</p>
              </div>
              <button
                className="hide button-three landlord-sign-up-button button"
                onClick={clickHandlerTwo}
              >
                Next
              </button>
            </div>
          </form>
        </div>
        <div className="column">
          <img src={drinks}></img>
        </div>
      </div>
    </div>
  )
}

export default LandLordSignUp
