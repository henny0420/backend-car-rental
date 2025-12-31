const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BrandSchema = new Schema({
    name: { 
        type: String,
        required: true, 
        unique: true, 
        trim: true, 
        lowercase: true 
    },
    country: {
        type: String,
        default: 'Unknown' 
    },
    logo: String

})

const Brand = mongoose.model("brands",BrandSchema)
module.exports = Brand