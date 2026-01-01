const DB = require('./../models')


const updateRoleController = async function(req,res){
   try {
     const {role} = req.body
     const {id} = req.params
     console.log(id);
     
 
     const update = await DB.USER.findByIdAndUpdate(id,{role})
     return res.json({message : 'role updated successfully',user : update.fullname ,role : update.role })
   } catch (error) {
    console.log(error);
    return res.json({
        status : 400,
        success :false,
        message : 'failed to update'
    })
   }
}


module.exports = {updateRoleController}