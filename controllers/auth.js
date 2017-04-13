var express = require('express')
var router = express.Router()

var User = require('../models/user')
router.route('/register')
.get(function (req, res) {
  res.render('auth/signup')
})
.post(function (req, res) {
  var newUser = new User({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password
  })
  newUser.save(function (err, data) {
    if (err) return res.redirect('/register')
    res.redirect('/')
  })
})

router.get('/register', function (req, res) {
  res.redirect('auth/signup')
})

router.route('/login')
.get(function (req, res) {
  res.render('auth/login')
})
.post(function (req, res) {
  User.findByEmail(req.body.email, function (err, foundUser) {
    if (err) return res.send(err)
    if (!foundUser) {
      console.log('no user')
      return res.redirect('/login')
    }
    var givenPassword = req.body.password
    if (foundUser.validPassword(givenPassword)) {
      console.log('correct password')
      res.redirect('/profile')
    } else {
      console.log('wrong password')
      res.redirect('/login')
    }
  })
})

module.exports = router
