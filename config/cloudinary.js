const cloudinary = require('cloudinary').v2
const fs= require('fs')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath,{   
            resource_type: "auto",
        });

        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return response;
    } catch (error) {        
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
};

const deleteFromClodinary = async (filePath) => {
    try {
        if(!filePath) return;
        const response = await cloudinary.uploader.destroy(filePath);
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {
    cloudinary,
    uploadOnCloudinary,
    deleteFromClodinary
}