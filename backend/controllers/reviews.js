import Pub from '../models/pub.js'
import User from '../models/user.js'
import isEqual from 'lodash.isequal'

export const addReviewtoPub = async (req, res) => {
  try {
    const userID = req.currentUser._id
    const userName = req.currentUser.username
    const userImage = req.currentUser.profileImage
    console.log('🚀 ~ file: reviews.js ~ line 9 ~ addReviewtoPub ~ userName', userName)
    const findUser = await User.findById(userID)
    if (findUser.isLandlord && !findUser.isUser) throw new  Error('user is a Landlord, Landlords cannot review pubs')
    else if (findUser.isLandlord && findUser.isUser) console.log('user is both Landlord and User, access approved')
    else console.log('user is not a landlord,  access approved')
    const { id } = req.params 
    const pub = await Pub.findById(id)
    if (!pub) throw new Error('Cannot find pub')
    if (isEqual(pub.pubOwner, userID)) {
      throw new Error('user is pub owner - cannot review your own pubs')
    } else {
      const newReview = { ...req.body, reviewOwner: userID, reviewOwnerName: userName, reviewOwnerImage: userImage, pubName: pub.nameOfPub }
      pub.reviews.push(newReview)
      findUser.userPubReviews.push(newReview)
      await pub.save()
      return res.status(200).json(pub)
    }
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
} 


export const deletePubReview = async (req, res) => {
  try {
    const userID = req.currentUser._id
    const findUser = await User.findById(userID)
    if (findUser.isLandlord) { 
      throw new  Error('user is a Landlord, Landlords cannot remmove pub reviews')
    } else console.log('user is not a landlord, access approved')
    const { id, reviewId } = req.params 
    const pub = await Pub.findById(id)
    if (!pub) throw new Error('Show not found')
    const reviewToDelete = pub.reviews.id(reviewId) 
    if (!reviewToDelete) throw new Error('Comment not found')
    if (!reviewToDelete.owner.equals(userID)) throw new Error('Unauthorized')
    await reviewToDelete.remove()
    await pub.save()
    return res.status(204).json()
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}

export const updatePubReview = async (req, res) => {
  try {
    const userID = req.currentUser._id
    const findUser = await User.findById(userID)
    if (findUser.isLandlord) { 
      throw new  Error('user is a Landlord, Landlords cannot remmove pub reviews')
    } else console.log('user is not a landlord, access approved')

    const { id } = req.params
    const pubToUpdate = await Pub.findById(id)
    if (!pubToUpdate) {
      throw new Error('no pub with that id exists...')
    }
    Object.assign(pubToUpdate, req.body)
    await pubToUpdate.save()
    return res.status(202).json(pubToUpdate)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}