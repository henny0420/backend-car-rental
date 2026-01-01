const express = require('express')
const router = express.Router()
const DB = require('../models')
const auth = require('../middleware/authenticate')
const CONTROLLERS = require('./../controllers')

router.post('/add', auth(true,['admin']) ,CONTROLLERS.BRAND.AddBrand)

module.exports =router