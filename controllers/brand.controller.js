const DB = require('./../models')


const AddBrand =  async function(req,res){
try{
        const {name , country}= req.body
        if(!name) return res.json({message : 'please enter a brand name'})
        
        const new_brand = await DB.BRAND.create({name,country})
        if(!new_brand) return res.json({message : 'brand is not added'})

        return res.json({
            status : 200,
            success : true,
            message : 'brand added successfully'
        })
        
} catch (error) {
    console.log(error);
    res.send('something went wrong')
    
}

}

const GetAllBrnadController = async function(req,res){
    try {
        const {id} = req.params
        console.log(id);
        
        if(id){
            const brand = await DB.BRAND.findById(id)

             if(!brand) return res.status(400).json({
                message : 'no brand found',
                status : 'falied'
            })

            return res.status(200).json(brand)

        }
        else {
            const brands = await DB.BRAND.find({})

            if(!brands) return res.status(400).json({
                message : 'there is no brands',
                status : 'falied'
            })

            return res.status(200).json(brands)}
    } catch (error) {
        return res.status(500).json({
            message:'something went wrong',
            success : "false"
        })
    }
}

const UpdateBrandController = async function(req,res){
    try {
        const {id} = req.params
        const {name , country} = req.body

        const update_brand = await DB.BRAND.findByIdAndUpdate(id,{name , country},{new : true})
        
        if(!update_brand)  return res.status(400).json({
            message:'there is no data to update',
            success : false
        })

        return res.status(200).json({
            message : 'updated successfully',
            success : true,
            data : update_brand
        })
    } catch (error) {
        return res.status(500).json({
            message : 'internal server error'
        })
    }
}

const DeleteBrandController = async function(req,res){
    try {
        const {id}  = req.params

        const delete_brand = await DB.BRAND.findByIdAndDelete(id)
        if(!delete_brand) return res.status(400).json({
            message : 'could not delete the brand',
            success : false
        })

        return res.status(200).json({
            message : 'deleted successfully',
            success : true,
            data : delete_brand
        })
    } catch (error) {
         return res.status(500).json({
            message : 'internal server error'
        })
    }
}

module.exports = {
    AddBrand,
    GetAllBrnadController,
    UpdateBrandController,
    DeleteBrandController
}