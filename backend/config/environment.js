const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/pub-hub'
const port = process.env.PORT || 4000
const secret = process.env.SECRET || 'shhhh its a secret'

//prettier-ignore
module.exports = {
  dbURI,
  port,
  secret
}
