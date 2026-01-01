const DB = require('./../models')

//-----ADD CAR -----------------------------------------------------//
const AddCarController = async (req, res) => {
  try {
    const {
      name,
      brand,
      model,
      carType,
      features,
      pricePerHour,
      registrationNumber,
      location,
    } = req.body

    if (!features) {
      return res.status(400).json({ message: "Features are required" })
    }

    const car = await DB.CAR.create({
      name,
      brand,
      model,
      carType,
      features: {
        color: features.color,
        transmission: features.transmission,
        fuelType: features.fuelType,
        seatingCapacity: features.seatingCapacity,
        hasAC: features.hasAC,
        hasGPS: features.hasGPS,
        bluetooth: features.bluetooth
      },
      pricePerHour,
      registrationNumber,
      location,
      images,
      createdBy: req.user?._id   
    })

    return res.status(201).json({
      success: true,
      message: "Car added successfully",
      car
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    })
  }
}

//-----VIEW CAR -----------------------------------------------------//

const GetAllCarsController = async function(req,res){
    try {
        let {page , limit} = req.query

        page = Number(page)
        limit = Number(limit)
        const skip = (page -1 )*limit

        const cars = await DB.CAR.find()
            .populate('brand','name')
            .populate('createdBy','name email')
            .skip(skip)
            .limit(limit)

        const total_cars = await DB.CAR.countDocuments({isActive:true})
            if(!cars) return res.status(400).json({
                success : false,
                message : 'there is no car data to fetch'
            })

            return res.status(200).json({
                success: true,
                totalCars: cars.length,
                cars
            })
    } catch (error) {
        console.error(error)
        res.status(500).json({
        success: false,
        message: 'Failed to fetch cars',
        error: error.message
    })
    }
}

//-----DELETE CAR -----------------------------------------------------//

const DeleteCarContoller = async function(req,res){

    try {
    const { id } = req.params

    const deletedCar = await DB.CAR.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    )

    if (!deletedCar) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Car deleted successfully (soft delete)',
      car: deletedCar
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete car',
      error: error.message
    })
  }

}

//-----UPDATE CAR -----------------------------------------------------//

const UpdateCarController = async function(req,res){
    try {
        const {id}= req.params
        const {
        name,
        brand,
        model,
        carType,
        features,
        pricePerHour,
        registrationNumber,
        location,
        isActive,
        rating,
        status
        } = req.body


     const update_car= await DB.CAR.findByIdAndUpdate(id,{
                                    name,
                                    brand,
                                    model,
                                    carType,
                                    features,
                                    pricePerHour,
                                    registrationNumber,
                                    location,
                                    isActive,
                                    rating,
                                    status
                                    },{new : true})
                                    .populate('brand','name')
        
    if (!update_car) {
    return res.status(404).json({
        success: false,
        message: 'Car not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Car updated successfully',
      car: update_car
    })

    } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Failed to update car',
      error: error.message
    })
    }
}

module.exports = {
    AddCarController,
    GetAllCarsController,
    DeleteCarContoller,
    UpdateCarController
}