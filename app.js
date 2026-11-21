const dotenv=require("dotenv");
dotenv.config();
const cors=require("cors")
const express=require("express");
const connectToDatabase=require("./db/db");
const app=express();
app.use(cors())
connectToDatabase()

app.get("/",(req,res)=>{
    res.send("hello")
})



module.exports=app;