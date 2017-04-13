var expect = require('chai').expect

var User = require('../models/user')
var dropMongooseDB = require('./drop_mongoose_db.js')

before(function (done) {
  dropMongooseDB(done)
})

describe('Creating a User', function () {
  it('should create successfully', function (done) {
    User.create({
      email: 'test@test.co',
      name: 'Brian',
      password: 'password'
    }, function (err, user) {
      if (err) return done(err)
      done()
    })
  })

  it('should give an error on invalid email addresses', function (done) {
    User.create({
      email: 'test',
      name: 'Brian',
      password: 'password'
    }, function (err, user) {
      // there should be an error

      if (err) return done()

      done(Error)
    })
  })

  it('should give an error on invalid name', function (done) {
    User.create({
      email: 'test@test.co',
      name: '',
      password: 'password'
    }, function (err, user) {
      // there should be an error
      if (err) return done()

      done(err)
    })
  })

  it('should give an error on invalid password', function (done) {
    User.create({
      email: 'test@test.co',
      name: 'Brian',
      password: 'short'
    }, function (err, user) {
      // there should be an error
      if (err) return done()

      done(err)
    })
  })

  it('should hash the password before save', function (done) {
    User.create({
      email: 'test@test.co',
      name: 'Brian',
      password: 'password'
    }, function (err, newUser) {
      if (err) return done(err)
      if (newUser && newUser.password === 'password') {
        done(Error) // given password cannot be the same as new password
      } else {
        done()
      }
    })
  })
})

describe('User instance methods', function () {
  describe('validPassword', function () {
    it('should validate a correct password', function (done) {
      User.findOne(function (err, user) {
        if (err) return done(err)
        if (user.validPassword('password')) {
          done()
        } else {
          done(Error)
        }
      })
    })

    it('should invalidate an incorrect password', function (done) {
      User.findOne(function (err, user) {
        if (err) return done(err)
        if (user.validPassword('nope')) {
          done(Error)
        } else {
          done()
        }
      })
    })
  })

  describe('toJSON', function () {
    it('should return a user without a password field', function (done) {
      User.findOne(function (err, user) {
        if (err) return done(err)
        if (user.toJSON().password === undefined) {
          done()
        } else {
          done(Error)
        }
      })
    })
  })
})
