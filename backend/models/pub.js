import mongoose from 'mongoose'
import reviewSchema from './reviews.js'

const pubSchema = new mongoose.Schema(
  {
    nameOfPub: { type: String, required: true },
    address: {
      line1: { type: String, required: true },
      line2: { type: String },
      town: { type: String },
      city: { type: String, required: true },
      postCode: { type: String, required: true, maxlength: 10 }
    },
    description: { type: String },
    isOutsideSeating: { type: Boolean, required: true },
    isPetFriendly: { type: Boolean, required: true },
    isFoodServed: { type: Boolean, required: true },
    isLiveSports: { type: Boolean, required: true },
    image: { type: String, default: 'no image provided' },
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


export default mongoose.model('Pub', pubSchema)
