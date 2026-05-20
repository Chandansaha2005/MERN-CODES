const mongoose = require("mongoose")
async function connectDB() {
    await mongoose.connect("mongodb://localhost:27017/tutorial")
    console.log("Connected to mongoDB")
}

module.exports=connectDB