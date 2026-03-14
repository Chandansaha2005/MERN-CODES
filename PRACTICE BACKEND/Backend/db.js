//db.js


const mongoose= require('mongoose');

const uri="mongodb://localhost:27017/"


const connectToMongo=() =>{
    mongoose.connect(uri);
    console.log("Connected successful");
}

module.exports = connectToMongo
