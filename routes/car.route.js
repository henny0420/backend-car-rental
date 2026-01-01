const express = require('express')
const DB = require('./../models')
const router = express.Router()
const CONTROLLER = require('./../controllers')


router.post('/add',CONTROLLER.CAR.AddCarController)
router.get('/all-cars',CONTROLLER.CAR.GetAllCarsController)
router.put('/update/:id',CONTROLLER.CAR.UpdateCarController)
router.delete('/delete/:id',CONTROLLER.CAR.DeleteCarContoller)

module.exports = router;