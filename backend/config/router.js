import express from 'express'
import { registerUser, loginUser } from '../controllers/auth.js'
import { addOnePub, deletePub, getAllPubs, getOnePub, updatePub } from '../controllers/pubs.js'
import { addReviewtoPub, deletePubReview } from '../controllers/reviews.js'
import { addOneUser, addPubToFavs, deleteUser, getAllUsers, getOneUser, updateUser } from '../controllers/user.js'
import { secureRoute } from './secureRoute.js'


const router = express.Router()


router.route('/users')
  .get(getAllUsers)
  .post(addOneUser)

router.route('/pubs')
  .get(getAllPubs)
  .post(secureRoute, addOnePub)

router.route('/users/:id')
  .get(getOneUser)
  .put(secureRoute, updateUser)
  .delete(secureRoute, deleteUser)

router.route('/pubs/:id/reviews')
  .post(secureRoute, addReviewtoPub)

router.route('/pubs/:id/reviews/:reviewId')
  .delete(secureRoute, deletePubReview)

router.route('/pubs/:id')
  .get(getOnePub)
  .put(secureRoute, updatePub)
  .delete(secureRoute, deletePub)

router.route('/register')
  .post(registerUser)

router.route('/users/:id/fav-pubs/:pubID')
  .post(addPubToFavs)
  //.delete(deletePubFromFavs)

router.route('/login')
  .post(loginUser)

export default router