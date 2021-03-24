import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'

const seedDatabase = async () => {
  try {
    await mongoose.connect()
  }
}

d