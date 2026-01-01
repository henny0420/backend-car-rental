const express=require('express')
const router = express.Router()
const auth = require('../middleware/authenticate')
const   controllers = require('./../controllers')

router.put('/update/:id',auth(true,['admin']),controllers.ROLE.updateRoleController)

module.exports = router