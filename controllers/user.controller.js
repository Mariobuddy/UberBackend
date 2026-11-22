const userModel=require("../models/user.model");
const {createUser}=require("../services/user.services")
const {validationResult}=require("express-validator")
const blacklistTokenModel=require("../models/blacklistToken.model")

const registerUser=async(req,res)=>{
const error=validationResult(req);
if(!error.isEmpty()){
    return res.status(400).json({errors:error.array()})
}
const {  fullname, email, password}=req.body;

const hashPassword= await userModel.hashPassword(password);

const user=await createUser({firstname:fullname?.firstname,lastname:fullname?.lastname,email,password:hashPassword});

const token= user.generateAuthToken();

res.status(200).json({token,user})

}


const loginUser=async(req,res)=>{
const error=validationResult(req);
if(!error.isEmpty()){
    return res.status(400).json({errors:error.array()})
}
const {  email, password}=req.body;

const user=await userModel.findOne({email}).select("+password");

if(!user){
    return res.status(401).json({errors:"Invalid email or password"})
}

const isPasswordMatch=await user?.comparePassword(password);

if(!isPasswordMatch){
     return res.status(401).json({errors:"Invalid email or password"})
}

const token= user.generateAuthToken();

res.cookie("token",token)

    res.status(200).json({token,user})

}

const profile=async(req,res)=>{
res.status(200).json(req.user)

}


const logout=async(req,res)=>{
    res.clearcookie("token");
    let token=req.cookies.token || req?.headers?.authorization;
    await blacklistTokenModel.create({token});
     res.status(200).json({message:"Logged Out"})
    
}

module.exports={registerUser,loginUser,profile,logout}