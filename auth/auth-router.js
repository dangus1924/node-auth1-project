const bcrypt = require('bcryptjs')
const express = require('express')
const restricted = require('../data/middleware/restricted')
const userModel = require('../users/users-model')

const router = express.Router()

router.post('/register', async (req, res, next) => {
    try {
        const saved = await userModel.add(req.body)
        res.status(201).json(saved)

    } catch (err){
        next(err)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const {username, password } = req.body
        const user = await userModel.findBy({ username }).first()
        const passwordValid = await bcrypt.compare(password, user.password)

        if(user && passwordValid) {
            req.session.user = user
            res.status(200).json({
                message: `Welcome ${user.username}!`
            })
        } else {
            res.status(401).json({
                message: 'Username && || password incorrect'
            })
        }

    } catch(err) {
        next(err)
    }
})

router.get("/protected", restricted(), async (req, res, next) => {
    try {      
      if (!req.session || !req.session.user) {
        return res.status(403).json({
              message: "your are not authorized",
            })
      }    
      res.json({
        message: "You are authorized",
      })
    } catch (err) {
      next(err)
    }
  })
  
  router.get('/logout', restricted(), (req, res, next) => {
    req.session.destroy((err) => {
      if (err) {
        next(err)
      } else {
        res.json({
          message: 'You are logged out',
        })
      }
    })
  })
  

module.exports = router