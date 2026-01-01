const DB=  require('../models')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY

const SignupController = async function (req,res) {
    try {
        const {fullname , email , password} = req.body
        console.log(fullname);
        
        if(!fullname || !email || !password) return res.json({message : 'please enter all details required'})

        const hashed_password = await bcrypt.hash(password,saltRounds)
        const add_user = await DB.USER.create({
            fullname:fullname,
            email :email,
            password : hashed_password
        });
        return res.json({
            message : 'you are signedup successfully',
            user_data :add_user
        })
    } catch (error) {
        return res.send('something went wrong!!')
    }
}

const SigninController = async function (req,res){
    try {
        const {password,email} = req.body
        if(!password || !email ) return res.json({message : 'please enter details'})

        const user_check = await DB.USER.findOne({email})
        if(!user_check) return res.json('wrong credentials')

        const password_check = await bcrypt.compare(password,user_check.password)
        if(password_check){
        const token = jwt.sign({
            fullname : user_check.fullname,
            role : user_check.role,
            _id : user_check._id
        },secret)

        user_check.token = token
        return res.json({
            message:'loggedin successfully',
            status:'200',
            token : token,
            role : user_check.role
        })
    }
        else{
            return res.json({
                status :400,
                message : 'wrong credentials'
            })
        }

    } catch (error) {
        res.send('something went wrong')
    }
}

module.exports= {
    SigninController,
    SignupController
}