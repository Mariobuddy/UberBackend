const dotenv=require("dotenv");
dotenv.config();
const cors=require("cors")
const express=require("express");
const connectToDatabase=require("./db/db");
const userRoutes=require("./routes/user.routes");
const cookieParser=require("cookie-parser")
const app=express();
app.use(cors())
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
connectToDatabase()

app.get("/",(req,res)=>{
    res.send("hello")
})

app.use("/users",userRoutes)



module.exports=app;