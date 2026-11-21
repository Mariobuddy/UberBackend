const mongoose=require("mongoose");

const connectToDatabase=async()=>{
try {
    mongoose.connect(process.env.DB_CONNECT);
    console.log(`Connected to database ${process.env.DB_CONNECT}`)
} catch (error) {
    console.log(error)
}
}

module.exports=connectToDatabase;