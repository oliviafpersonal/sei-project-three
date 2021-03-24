import express from 'express'
import { addOnePub, deletePub, getAllPubs, getOnePub, updatePub } from '../controllers/pubs'
import { addOneUser, deleteUser, getAllUsers, getOneUser, updateUser } from '../controllers/user'


const router = express.Router()


router.route('/users')
  .get(getAllUsers)
  .post(addOneUser)

router.route('/pubs')
  .get(getAllPubs)
  .post(addOnePub)

router.route('/users/:id')
  .get(getOneUser)
  .put(updateUser)
  .delete(deleteUser)


router.route('users/:d')
  .get(getOnePub)
  .post(updatePub)
  .delete(deletePub)

export default router