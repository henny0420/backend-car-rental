const express = require('express')
const router = express.Router()
const DB = require('../models')
const auth = require('../middleware/authenticate')
const CONTROLLERS = require('./../controllers')

router.post('/add', auth(true,['admin']) ,CONTROLLERS.BRAND.AddBrand)
router.get('/brands/:id',CONTROLLERS.BRAND.GetAllBrnadController)
router.get('/brands',CONTROLLERS.BRAND.GetAllBrnadController)
router.put('/:id',CONTROLLERS.BRAND.UpdateBrandController)
router.delete('/:id',CONTROLLERS.BRAND.DeleteBrandController)

module.exports =router