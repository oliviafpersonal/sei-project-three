import mongoose from 'mongoose'
import reviewSchema from './reviews.js'

const pubSchema = new mongoose.Schema({
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
  reviews: [ reviewSchema ]
}, { timestamps: true })

pubSchema
  .set('toJSON', { virtuals: true })

pubSchema
  .virtual('averageRating')
  .get(function () {
    
    console.log('🚀 ~ file: pub.js ~ line 31 ~ this.reviews', this.reviews)
    const ratingsArray = this.reviews.map(rating => {
      return rating.overallRating 
    })
    console.log('🚀 ~ file: pub.js ~ line 32 ~ ratingsArray', ratingsArray)

    const sum = ratingsArray.reduce((acc, curr) => {
      return acc + curr
    }, 0)
    const average = sum / ratingsArray.length
    console.log('average>>>>>>>>>>>>', average)
    return average
  })

export default mongoose.model('Pub', pubSchema)