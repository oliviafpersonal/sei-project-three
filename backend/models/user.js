import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, maxlength: 40 },
  email: { type: String, unique: true },
  password: { type: String },
  profileImage: { type: String },
  isLandlord: { type: Boolean }
  //*has access to comments, can CRUD comments and self
})

userSchema
  .virtual('passwordConfirmation')
  .set(function(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .pre('validate', function(next) {
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
      this.invalidate('passwordConfirmation', 'Passwords do not match') 
    }
    next()
  })
  

userSchema
  .pre('save', function (next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync)
    }
    next()
  })

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

export default mongoose.model('User', userSchema)