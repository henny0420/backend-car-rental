const express = require('express')
const DB = require('./../models')
const router = express.Router()
const CONTROLLER = require('./../controllers')
const { upload } = require('../middleware/multer')


// router.post('/add',upload.single("image"),CONTROLLER.CAR.AddCarController)
// router.post('/add',upload.array("image",10),CONTROLLER.CAR.AddCarController)
router.post('/add',upload.fields([
    {name : "coverImage" , maxCount: 1},
    {name:"galleryImages" , maxCount:10 }
]),CONTROLLER.CAR.AddCarController)
router.get('/all-cars',CONTROLLER.CAR.GetAllCarsController)
router.put('/update/:id',CONTROLLER.CAR.UpdateCarController)
router.delete('/delete/:id',CONTROLLER.CAR.DeleteCarContoller)

module.exports = router;