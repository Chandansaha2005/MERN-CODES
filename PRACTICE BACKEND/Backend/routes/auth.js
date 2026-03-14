//auth.js


const express = require('express');
const User = require('../models/User');
const route = express.Router();

route.post('/',(req,res)=>{
   console.log(req.body);
   const user= User(req.body);
   user.save()
   res.send(req.body);
})

module.exports = route