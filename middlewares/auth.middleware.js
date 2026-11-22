const jwt=require("jsonwebtoken");
const userModel=require("../models/user.model")
const blacklistToken=require("../models/blacklistToken.model")



const authUser=async(req,res,next)=>{
    let token=req.cookies.token || req?.headers?.authorization;
    if(!token){
        return res.status(401).json({errors:"Sorry you are not authorized to perform this action"})
    }

    const isBlackedListed=await userModel.findOne({token});

    if(isBlackedListed){
         return res.status(401).json({errors:"Sorry you are not authorized to perform this action"})
    }
    try {
       let decode=jwt.verify(token,process.env.JWT_TOKEN);
       const user=await userModel.findById(decode?.id);

       req.user=user;
       return next()
    } catch (error) {
         return res.status(401).json({errors:"Sorry you are not authorized to perform this action"})
    }

}

module.exports={authUser}