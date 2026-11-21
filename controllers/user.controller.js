const userModel=require("../models/user.model");
const {createUser}=require("../services/user.services")
const {validationResult}=require("express-validator")

const registerUser=async(req,res,next)=>{
const error=validationResult(req);
if(!error.isEmpty()){
    return res.status(400).json({errors:error.array()})
}
const {  firstname,
            lastname,
        email,
        password}=req.body
}

module.exports={registerUser}