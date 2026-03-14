const connectToMongo = require("./db")
const express = require('express')
const cors=require('cors')
const User=require('./models/Note');
const {body, validationResult}=require('express-validator');
const b1=require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_str="React JS";

connectToMongo()
const app = express()
app.use(express.json())
app.use(cors())

app.post('/register',async (req,res)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
     return res.status(500).json({errors:errors.array()});
  }
  try {
     let user = await User.findOne({email: req.body.email});
     if (user){
        return res.status(404).json({error:"user already exist"})
     }
     const salt= await b1.genSalt(6);
     const spass= await b1.hash(req.body.password, salt);
     console.log(spass);
     user =await User.create({
        name: req.body.name,
        email: req.body.email,
        password: spass,
     });
     const data={
      user:{
        id:user.id
      }
     }
     const authtoken = jwt.sign(data, jwt_str);
//     res.json(authtoken)
       res.json("Success")
     //res.json(user)
  } catch (error) {
     console.error(error.massage);
     res.status(600).send("Some Error occured");
  }
  
})
app.post('/login',[body('email','Enter a valid email').isEmail(),
   body('password','password cannot be empty').exists(),
   ], async (req,res)=>{
     const errors=validationResult(req);
     if(!errors.isEmpty()){
        return res.status(500).json({errors:errors.array()});
     }
     const {email,password}=req.body;
     try {
        let user = await User.findOne({email});
        if (!user){
           return res.status(406).json({error:"user not exist"})
        }
        const passcom = await b1.compare(password, user.password);
        //console.log(b1.decodeBase64());
        console.log("DB Password = "+password)
        console.log("Page Password = "+user.password)
        if(!passcom){
         return res.status(406).json({error:"password miss match"})
        }
        const data={
         user:{
           id:user.id
         }
        }
        const authtoken = jwt.sign(data, jwt_str);
        res.json("Success")
   
     } catch (error) {
        console.error(error.massage);
        res.status(700).send("Some Error occured");
     }
     
   })
 
app.listen(3001,()=>{
  console.log("server is ready")
})
