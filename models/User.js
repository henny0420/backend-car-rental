const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
    fullname: {
    type: String,
    trim: true,
    require: true,
  },
  password: {
    type: String,
    trim: true,
    require: true,
  },
  email: {
    type: String,
    trim: true,
    require: true,
    unique :true
  },
  role: {
    type: String,
    enum : ['user','owner','admin'],
    default:'user'
  },
  isActive: {
    type: Boolean,
    default: true,
  },
})
const UserModel = mongoose.model('Users',UserSchema)
module.exports = UserModel
