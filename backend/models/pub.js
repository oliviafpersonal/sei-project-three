import mongoose from 'mongoose'

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
  owner: { type: mongoose.Schema.Types.ObjectID, ref: 'User' }
}, { timestamps: true })

export default mongoose.model('Pub', pubSchema)