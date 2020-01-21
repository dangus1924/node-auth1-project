const express = require('express')
const restricted = require('../data/middleware/restricted')
const userModel = require('./users-model')

const router = express.Router()

  
router.get("/", restricted(), async (req, res, next) => {
  try {
    const user = await userModel.find()
    
    res.json(user)
  } catch (err) {
    next(err)
  }
})
  
module.exports = router  