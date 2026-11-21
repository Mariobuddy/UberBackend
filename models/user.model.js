const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt")


const userSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minLength:[3,"First name must be at least 3 character long"]
        },
           firstname:{
            type:String,
            required:false,
            minLength:[3,"Last name must be at least 3 character long"]
        },
        email:{
            type:String,
            required:true,
            unique:true,
            minLength:[5,"Email must be at least 3 character long"]
        },
        password:{
            type:String,
            required:true,
            select:false
        },
        socketId:{
            type:String
        }
    }
})

userSchema.methods.generateAuthToken=()=>{
    const token= jwt.sign({id:this.id},process.env.JWT_TOKEN);
    return token
}

userSchema.methods.comparePassword=async(password)=>{
try {
    await bcrypt.compare(password,this.password )
} catch (error) {
    console.log(error)
}
}

userSchema.statics.hashPassword=async(password)=>{
    try {
        await bcrypt.hash(password,10)
    } catch (error) {
        console.log(error)
    }
}

const userModel=mongoose.model("user",userSchema);

module.exports=userModel