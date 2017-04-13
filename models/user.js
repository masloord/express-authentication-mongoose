var mongoose = require('mongoose')
var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

// draw schema

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: emailRegex
  },
  name: {
    type: String,
    required: true,
    minlength: [3, 'Name must be between 3 and 99 characters'],
    maxlength: [99, 'Name must be between 3 and 99 characters']
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be between 8 and 99 characters'],
    maxlength: [99, 'Password must be between 8 and 99 characters']
  }

})

// do sth b4 create user
var bcrypt = require('bcrypt')
userSchema.pre('save', function (next) {
  var user = this
  console.log('about TO SAVE user', user)
  // hash the password
  var hash = bcrypt.hashSync(user.password, 10)
  console.log('orginal password', user.password)
  console.log('hashed password', hash)
  user.password = hash
  next()
})
var User = mongoose.model('User', userSchema)

module.exports = User
