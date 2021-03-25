import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const reviewSchema = new mongoose.Schema({
  rating: {
    isAverageRating: { type: Number },
    price: { type: Number },
    availability: { type: Number },
    comfortability: { type: Number }
  },
  text: { type: String, maxlength: 300 },
  owner: { type: mongoose.Schema.Types.ObjectID, ref: 'User' }
}, {
  timestamps: true
})


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 40 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  isLandlord: { type: Boolean },
  isFirstTime: { type: Boolean },
  reviews: [ reviewSchema ]
  
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
  .set(function(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

// * Check if password and passwordConfirmation match
userSchema
  .pre('validate', function(next) {
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
      this.invalidate('passwordConfirmation', 'Passwords do not match')
    }
    next()
  })

userSchema
  .pre('save', function(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })

userSchema.methods.validatePassword = function(password) {
  console.log(this.password)
  return bcrypt.compareSync(password, this.password)
}

export default mongoose.model('User', userSchema)