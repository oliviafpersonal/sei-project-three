import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'
import pubSeed from './data/pubSeeds.js'
import userSeed from './data/userSeeds.js'
import User from '../models/user.js'
import Pub from '../models/pub.js'


const seedDatabase = async () => {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

    await mongoose.connection.db.dropDatabase()

    const users = await User.create(userSeed)

    const pubsWithUsers = pubSeed.map(pub => {
      pub.pubOwner = users[0]._id
      return pub
    })

    await Pub.create(pubsWithUsers)

    await mongoose.connection.close()
  } catch (error) {
    await mongoose.connection.close()
  }
}

seedDatabase()