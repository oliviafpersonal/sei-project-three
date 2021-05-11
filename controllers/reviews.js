import Pub from '../models/pub.js'
import User from '../models/user.js'
import isEqual from 'lodash.isequal'

export const addReviewtoPub = async (req, res) => {
  try {
    const userID = req.currentUser._id
    const userName = req.currentUser.username
    const userImage = req.currentUser.profileImage
    const findUser = await User.findById(userID)
    if (findUser.isLandlord && !findUser.isUser)
      throw new Error('user is a Landlord, Landlords cannot review pubs')
    const { id } = req.params
    const pub = await Pub.findById(id)
    if (!pub) throw new Error('Cannot find pub')
    if (isEqual(pub.pubOwner, userID)) {
      throw new Error('user is pub owner - cannot review your own pubs')
    } else {
      // spreading in the data changed as react doesn't like state of nested objects
      const newReview = {
        subRating: {
          availability: req.body.availability,
          comfortability: req.body.comfortability,
          price: req.body.price,
        },
        reviewOwner: userID,
        reviewOwnerName: userName,
        reviewOwnerImage: userImage,
        pubName: pub.nameOfPub,
        pubID: pub._id,
        text: req.body.text,
      }
      pub.reviews.push(newReview)
      findUser.allReviews.push(newReview)
      await pub.save()
      await findUser.save()
      return res.status(200).json(pub)
    }
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}

export const deletePubReview = async (req, res) => {
  try {
    const userID = req.currentUser._id
    const { id, reviewId } = req.params
    const pub = await Pub.findById(id)
    if (!pub) throw new Error('Show not found')
    const reviewToDelete = pub.reviews.id(reviewId)
    if (!reviewToDelete) throw new Error('Comment not found')
    if (!reviewToDelete.reviewOwner.equals(userID))
      throw new Error('Unauthorized')
    await reviewToDelete.remove()
    await pub.save()
    return res.status(204).json('✅succesfully deleted')
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}

export const updatePubReview = async (req, res) => {
  try {
    const userID = req.currentUser._id
    const findUser = await User.findById(userID)
    if (findUser.isLandlord) {
      throw new Error(
        'user is a Landlord, Landlords cannot remmove pub reviews'
      )
    }

    const { id } = req.params
    const pubToUpdate = await Pub.findById(id)
    if (!pubToUpdate) {
      throw new Error('no pub with that id exists...')
    }
    Object.assign(pubToUpdate, req.body)
    await pubToUpdate.save()
    return res.status(202).json(pubToUpdate)
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}
