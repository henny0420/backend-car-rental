const DB = require('./../controllers')


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

module.exports = {
    AddBrand
}