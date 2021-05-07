import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import reviewSchema from './reviews.js'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 40 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: {
    type: String,
    default:
      'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
  },
  isLandlord: { type: Boolean, default: false },
  isUser: { type: Boolean, default: true },
  isFirstTime: { type: Boolean, default: true },
  favouritePubs: { type: Array },
  allReviews: [reviewSchema]
}, {
  timestamps: true
})
//*has access to comments, can CRUD comments and self

userSchema.set('toJSON', {
  virtuals: true,
  transform(_doc, json) {
    delete json.password
    return json
  }
})

// * Define virtual field on schema
userSchema
  .virtual('passwordConfirmation') // defining name of virtual field
  .set(function (passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

// * Check if password and passwordConfirmation match
userSchema.pre('validate', function (next) {
  if (
    this.isModified('password') &&
    this.password !== this._passwordConfirmation
  ) {
    this.invalidate('passwordConfirmation', 'Passwords do not match')
  }
  next()
})

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  }
  next()
})

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

export default mongoose.model('User', userSchema)
