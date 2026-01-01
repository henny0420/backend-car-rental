const express = require('express')
const router=  express.Router();
const CONTROLLER = require('./../controllers')
const auth = require('../middleware/authenticate')



router.post('/signup',CONTROLLER.USER.SignupController)

router.post('/signin',CONTROLLER.USER.SigninController)
console.log(CONTROLLER.USER)


module.exports = router