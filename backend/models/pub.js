import mongoose from 'mongoose'
import reviewSchema from './reviews.js'
import axios from 'axios'

const pubSchema = new mongoose.Schema(
  {
    nameOfPub: { type: String },
    address: {
      line1: { type: String },
      line2: { type: String },
      town: { type: String },
      city: { type: String },
      postCode: { type: String, maxlength: 10 }
    },
    description: { type: String },
    isOutsideSeating: { type: Boolean },
    isPetFriendly: { type: Boolean },
    isFoodServed: { type: Boolean },
    isLiveSports: { type: Boolean },
    image: { type: String },
    pubOwner: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    reviews: [reviewSchema]
  },
  { timestamps: true }
)

pubSchema.set('toJSON', { virtuals: true })

pubSchema
  .virtual('averageRating')
  .get(function () {
  //console.log('🚀 ~ file: pub.js ~ line 31 ~ this.reviews', this.reviews)
    const ratingsArray = this.reviews.map((rating) => {
      return rating.overallRating
    })
    const sum = ratingsArray.reduce((acc, curr) => {
      return acc + curr
    }, 0)
    const average = sum / ratingsArray.length
    return !average ? 'is not yet rated' : average

  })

pubSchema
  .virtual('averageRatingPrice')
  .get(function () {
    const priceArray = this.reviews.map(rating => {
      return rating.subRating.price
    })
    //console.log('🚀 ~ file: pub.js ~ line 49 ~ priceArray', priceArray)
    const sum = priceArray.reduce((acc, curr) => {
      return acc + curr
    }, 0)
    const average = sum / priceArray.length
    return !average ? 'is not yet rated' : average

  })
pubSchema
  .virtual('averageRatingAvailability')
  .get(function () {
    const availabilityArray = this.reviews.map(rating => {
      return rating.subRating.availability
    })
    //console.log('🚀 ~ file: pub.js ~ line 49 ~ availabilityArray', availabilityArray)
    const sum = availabilityArray.reduce((acc, curr) => {
      return acc + curr
    }, 0)
    const average = sum / availabilityArray.length
    return !average ? 'is not yet rated' : average

  })
pubSchema
  .virtual('averageRatingComfortability')
  .get(function () {
    const comfortabilityArray = this.reviews.map(rating => {
      return rating.subRating.comfortability
    })
    //console.log('🚀 ~ file: pub.js ~ line 49 ~ comfortabilityArray', comfortabilityArray)
    const sum = comfortabilityArray.reduce((acc, curr) => {
      return acc + curr
    }, 0)
    const average = sum / comfortabilityArray.length
    return !average ? 'is not yet rated' : average

  })

pubSchema
  .virtual('locationCoordinates')
  .get( async function  () {
    const input = this.address.postCode
    if (!input) return null
    const externalData = async ()  => {
      const { data } = await axios.get(`http://api.getthedata.com/postcode/${input}`)
      const lat =  await data.data.latitude
      const long = await data.data.longitude
      return {
        longitude: Number(long),
        latitude: Number(lat)
      }
    }

    externalData()
    const coordinates = await externalData()
    console.log('coords>>>>>>>>>', coordinates)
    return coordinates

  })


export default mongoose.model('Pub', pubSchema)
