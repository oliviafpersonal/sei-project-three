import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  subRating: {
    price: { type: Number, required: true },
    availability: { type: Number, required: true },
    comfortability: { type: Number, required: true }
  },
  text: { type: String, maxlength: 300, default: 'No comments submitted' },
  reviewOwner: { type: mongoose.Schema.Types.ObjectID, ref: 'User' }
}, {
  timestamps: true
})

reviewSchema
  .set('toJSON', { virtuals: true })

reviewSchema
  .virtual('overallRating')
  .get(function() {
    const ratingsArray = Object.values(this.subRating)
    const sum = ratingsArray.reduce((acc, curr) => {
      return acc + curr
    }, 0)
    const average = sum / ratingsArray.length
    //console.log('average>>>>>>>>>>>>', average)
    return !average ? 'not yet rated' : average
  })

export default reviewSchema